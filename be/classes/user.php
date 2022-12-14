<?php
    include_once("log.php");
    include_once("utils.php");
    class User {
        public $id;
        public $username;
        private $password;
        public $nome;
        public $cognome;
        public $role_id;
        public $is_active;
        public $permissions;
        public $email;
        public $id_usca;

        public function setUserName($val){
            $this->username=$val;
        }

        public function getUserName(){
            return $this->username;
        }

        public function setPassword($val){
            $this->password=hash("sha256",$val);
        }

        public function getPassword(){
            return $this->password;
        }

        public function setNome($val){
            $this->nome=$val;
        }

        public function getNome(){
            return $this->nome;
        }

        public function setCognome($val){
            $this->cognome=$val;
        }

        public function getCognome(){
            return $this->cognome;
        }

        public function setRoleId($val){
            $this->role_id=$val;
        }

        public function getRoleId(){
            return $this->role_id;
        }

        public function setEmail($val){
            $this->email=$val;
        }

        public function getEmail(){
            return $this->email;
        }

        public function setIsActive($val){
            $this->is_active=$val;
        }

        public function getIsActive(){
            return $this->is_active;
        }

        public function setId($val){
            $this->id=$val;
        }

        public function getId(){
            return $this->id;
        }

        public function setIdUsca($val){
            $this->id_usca=$val;
        }

        public function getIdUsca(){
            return $this->id_usca;
        }

        function __construct() {
            $this->id = null;
            $this->password = null;
        }

        public function login(){
            /*
             *
             *
             SELECT rs.id AS id,
             s.descrizione AS stato,
             r.descrizione AS ruolo,
             rs.permission AS permission
             FROM `roles_states` AS rs JOIN `roles` AS r ON rs.role_id=r.id
             JOIN `stati_tamponi` AS s ON rs.state_id=s.id
             */
            $out = new stdClass();
            $out->status="KO";
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {
                        $query="SELECT u.id AS id, u.nome AS nome, u.cognome AS cognome, u.role_id AS role_id, u.is_active AS is_active, r.permissions AS permissions, u.email AS email, u.id_usca AS id_usca FROM `users` AS u JOIN `roles` AS r ON u.role_id=r.id WHERE `username`=:username AND `password`=:password";

                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':username',$this->username,PDO::PARAM_STR);
                        $stmt->bindParam(':password',$this->password,PDO::PARAM_STR);
                        $stmt->execute();
                        $res=$stmt->fetch(PDO::FETCH_ASSOC);
                        if(!$res){
                            throw new Exception("WRONG-USERNAME-AND-PASSWORD");
                        } else {
                            if(!$res["is_active"]){
                                $out->error="USER-IS-NOT-ACTIVE";
                            } else {
                                createSession();
                                $this->id=$res["id"];
                                $this->nome=$res["nome"];
                                $this->cognome=$res["cognome"];
                                $this->role_id=$res["role_id"];
                                $this->is_active=$res["is_active"];
                                $this->email=$res["email"];
                                $this->permissions=json_decode($res["permissions"]);
                                $this->id_usca=$res["id_usca"];
                                $this->reading_states=[];
                                $this->writing_states=[];
                                
                                $query="SELECT * FROM `roles_states` WHERE role_id=:role_id AND permission IN ('R','F')";
                                $stmt = $conn->prepare($query);
                                $stmt->bindParam(':role_id',$this->role_id,PDO::PARAM_INT);
                                $stmt->execute();
                                $resS=$stmt->fetchAll(PDO::FETCH_ASSOC);
                                foreach($resS AS $r){
                                    array_push($this->reading_states,$r['state_id']);
                                }
                                $query="SELECT * FROM `roles_states` WHERE role_id=:role_id AND permission IN ('W','F')";
                                $stmt = $conn->prepare($query);
                                $stmt->bindParam(':role_id',$this->role_id,PDO::PARAM_INT);
                                $stmt->execute();
                                $resS=$stmt->fetchAll(PDO::FETCH_ASSOC);
                                foreach($resS AS $r){
                                    array_push($this->writing_states,$r['state_id']);
                                }
                                $out->status="OK";
                                $out->data=$this;
                                $_SESSION["loggeduser"] = json_encode($this);
                                Log::insert("LOGIN",null,null,null,null);
                            }

                        }
                    } catch(Exception $ex){
                            $out->error=$ex->getMessage();
                        }
                }
                else {
                    $out->error="DB-CONNECTION-ERROR";
                }
            } catch(Exception $e){
                $conn=null;
            }
            //file_put_contents("../log/dbtest.log",(new DateTime("now"))->format("Y-m-d H:i").$msg."\n",FILE_APPEND);
            return $out;
        }

        public function logout(){
            $out = new stdClass();
            $out->status="KO";
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {
                        session_start();
                        $user = json_decode($_SESSION["loggeduser"]);
                        Log::insert("LOGOUT",null,null,null,null);
                        session_unset();
                        session_destroy();
                    } catch(Exception $ex){
                            $out->error=$ex->getMessage();
                        }
                }
                else {
                    $out->error="DB-CONNECTION-ERROR";
                }
            } catch(Exception $e){
                $conn=null;
            }
            return $out;
        }

        public static function getUsers($username,$token){
            $out = new stdClass();
            $out->status="KO";
            $out->data=[];
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {
                        $query="SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':username',$username,PDO::PARAM_STR);
                        $stmt->execute();
                        $res=$stmt->fetch(PDO::FETCH_ASSOC);
                        if (User::checkToken($token) && $res && $res['is_active']==1 AND User::checkCanCreateUser($res['role_id'])){
                            $query="SELECT u.id AS id,
                            u.username AS username,
                            u.nome AS nome,
                            u.cognome AS cognome,
                            u.role_id AS role_id,
                            u.email AS email,
                            u.is_active AS is_active,
                            u.id_usca AS id_usca
                            FROM `users` AS u JOIN `roles` AS r ON u.role_id=r.id ";

                            $stmt = $conn->prepare($query);
                            $stmt->execute();
                            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
                            foreach($results as $res){
                                $user = new User();
                                $user->setId($res['id']);
                                $user->setUserName($res['username']);
                                $user->setNome($res['nome']);
                                $user->setCognome($res['cognome']);
                                $user->setRoleId($res['role_id']);
                                $user->setEmail($res['email']);
                                $user->setIsActive($res['is_active']==1);
                                $user->setIdUsca($res['id_usca']);
                                array_push($out->data,$user);
                            }
                            $out->status="OK";
                        } else {
                            throw new Exception("OPERAZIONE-NON-PERMESSA");
                        }
                    } catch(Exception $ex){
                            $out->error=$ex->getMessage();
                        }
                }
                else {
                    $out->error="DB-CONNECTION-ERROR";
                }
            } catch(Exception $e){
                $conn=null;
            }
            //file_put_contents("../log/dbtest.log",(new DateTime("now"))->format("Y-m-d H:i").$msg."\n",FILE_APPEND);
            return $out;
        }

        public function insert($username,$token){
            $out = new stdClass();
            $out->status="KO";
            $out->data=[];
            checkAndExtendSession();
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {
                        $query="SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':username',$username,PDO::PARAM_STR);
                        $stmt->execute();
                        $res=$stmt->fetch(PDO::FETCH_ASSOC);
                        if (User::checkToken($token) && $res && $res['is_active']==1 AND User::checkCanCreateUser($res['role_id'])){
                            $query="SELECT count(id) presente
                            FROM `users` AS u WHERE u.username=:username";
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':username',$this->username,PDO::PARAM_STR);
                            $stmt->execute();
                            $res=$stmt->fetch(PDO::FETCH_ASSOC);
                            if($res && $res['presente']==0){
                                $query="INSERT INTO `users` (nome,cognome,username,email,password,role_id,id_usca) VALUES (:nome,:cognome,:username,:email,:password,:role_id,:id_usca)";
                                $stmt = $conn->prepare($query);
                                $stmt->bindParam(':nome',$this->nome,PDO::PARAM_STR);
                                $stmt->bindParam(':cognome',$this->cognome,PDO::PARAM_STR);
                                $stmt->bindParam(':username',$this->username,PDO::PARAM_STR);
                                $stmt->bindParam(':email',$this->email,PDO::PARAM_STR);
                                $stmt->bindParam(':password',$this->password,PDO::PARAM_STR);
                                $stmt->bindParam(':role_id',$this->role_id,PDO::PARAM_INT);
                                $stmt->bindParam(':id_usca',$this->id_usca,PDO::PARAM_INT);
                                $stmt->execute();
                                $this->setId($conn->lastInsertId());
                                if ($this->getId()!=0){
                                    $out->status="OK";
                                } else {
                                    throw new Exception("ERRORE-DI-INSERIMENTO");
                                }
                            } else {
                                throw new Exception("USERNAME-ESISTENTE");
                            }
                            $out->status="OK";
                        } else {
                            throw new Exception("OPERAZIONE-NON-PERMESSA");
                        }
                    } catch(Exception $ex){
                            $out->error=$ex->getMessage();
                        }
                }
                else {
                    $out->error="DB-CONNECTION-ERROR";
                }
            } catch(Exception $e){
                $conn=null;
            }
            //file_put_contents("../log/dbtest.log",(new DateTime("now"))->format("Y-m-d H:i").$msg."\n",FILE_APPEND);
            return $out;
        }

        public function update($username,$token){
            $out = new stdClass();
            $out->status="KO";
            $out->data=[];
            checkAndExtendSession();
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {
                        $query="SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':username',$username,PDO::PARAM_STR);
                        $stmt->execute();
                        $res=$stmt->fetch(PDO::FETCH_ASSOC);
                        if (User::checkToken($token) && $res && $res['is_active']==1 AND User::checkCanEditUser($res['role_id'])){
                            $query="SELECT count(id) presente
                            FROM `users` AS u WHERE u.username=:username AND NOT u.id=:id";
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':username',$this->username,PDO::PARAM_STR);
                            $stmt->bindParam(':id',$this->id,PDO::PARAM_STR);
                            $stmt->execute();
                            $res=$stmt->fetch(PDO::FETCH_ASSOC);
                            if($res && $res['presente']==0){
                                $query="UPDATE `users` SET
                                nome = :nome,
                                cognome = :cognome,
                                username = :username,
                                email = :email,
                                role_id = :role_id,
                                is_active = :is_active,
                                id_usca = :id_usca";
                                $query.=($this->getPassword()!=null)?", password=:password":"";
                                $query.=" WHERE id=:id";
                                $stmt = $conn->prepare($query);
                                $stmt->bindParam(':id',$this->id,PDO::PARAM_STR);
                                $stmt->bindParam(':nome',$this->nome,PDO::PARAM_STR);
                                $stmt->bindParam(':cognome',$this->cognome,PDO::PARAM_STR);
                                $stmt->bindParam(':username',$this->username,PDO::PARAM_STR);
                                $stmt->bindParam(':email',$this->email,PDO::PARAM_STR);
                                if ($this->password!=null) {
                                    $stmt->bindParam(':password',$this->password,PDO::PARAM_STR);
                                }
                                $stmt->bindParam(':role_id',$this->role_id,PDO::PARAM_INT);
                                $stmt->bindParam(':is_active',$this->is_active,PDO::PARAM_INT);
                                $stmt->bindParam(':id_usca',$this->id_usca,PDO::PARAM_INT);
                                $stmt->execute();
                                if ($stmt->rowCount()==1){
                                    $out->status="OK";
                                } else {
                                    throw new Exception("AGGIORNAMENTO-NON-ESEGUITO");
                                }
                            } else {
                                throw new Exception("USERNAME-IN-USO-PER-ALTRO-UTENTE");
                            }
                            $out->status="OK";
                        } else {
                            throw new Exception("OPERAZIONE-NON-PERMESSA");
                        }
                    } catch(Exception $ex){
                            $out->error=$ex->getMessage();
                        }
                }
                else {
                    $out->error="DB-CONNECTION-ERROR";
                }
            } catch(Exception $e){
                $conn=null;
            }
            //file_put_contents("../log/dbtest.log",(new DateTime("now"))->format("Y-m-d H:i").$msg."\n",FILE_APPEND);
            return $out;
        }

        public static function checkCanCreateUser($role_id){
            return ($role_id=="1"); // va implementato un check sul ruolo sulla base del json memorizzato
        }

        public static function checkCanEditUser($role_id){
            return ($role_id=="1"); // va implementato un check sul ruolo sulla base del json memorizzato
        }

        public static function checkCanCreateAssistito($role_id){
            return true; // va implementato un check sul ruolo sulla base del json memorizzato
        }

        public static function checkCanUpdateAssistito($role_id){
            return true; // va implementato un check sul ruolo sulla base del json memorizzato
        }

        public static function checkCanCreateRequest($role_id){
            return true; // va implementato un check sul ruolo sulla base del json memorizzato
        }

        public static function checkCanUpdateRequest($role_id){
            return true; // va implementato un check sul ruolo sulla base del json memorizzato
        }

        public static function checkCanDeleteRequest($role_id){
            return true; // va implementato un check sul ruolo sulla base del json memorizzato
        }

        public static function checkToken($token){
            return ($token=="123456"); // va implementata una generazione token con controllo di scadenza e restituito un oggetto con anche i dati quali lo username
        }

        public function checkPermissions($check){
            $out = false;
            if (isset($this->permissions) && isset($this->permissions->$check)){
                $out=$this->permissions->$check;
            }
            return $out;
        }
    }
