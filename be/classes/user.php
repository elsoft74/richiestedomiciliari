<?php
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
        
        public function setUserName($val){
            $this->username=$val;
        }

        public function getUserName($val){
            return $this->username;
        }

        public function setPassword($val){
            $this->password=$val;
        }

        public function getPassword($val){
            return $this->password;
        }

        public function setNome($val){
            $this->nome=$val;
        }

        public function getNome($val){
            return $this->nome;
        }

        public function setCognome($val){
            $this->cognome=$val;
        }

        public function getCognome($val){
            return $this->cognome;
        }

        public function setRoleId($val){
            $this->role_id=$val;
        }

        public function getRoleId($val){
            return $this->role_id;
        }

        public function setEmail($val){
            $this->email=$val;
        }

        public function getEmail($val){
            return $this->email;
        }

        public function setIsActive($val){
            $this->is_active=$val;
        }

        public function getIsActive($val){
            return $this->is_active;
        }

        public function setId($val){
            $this->id=$val;
        }

        public function getId($val){
            return $this->id;
        }

        public function login(){
            $out = new stdClass();
            $out->status="KO";
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {
                        // $password=hash("sha256",$this->password);
                    
                        $query="SELECT u.id AS id, u.nome AS nome, u.cognome AS cognome, u.role_id AS role_id, u.is_active AS is_active, r.permissions AS permissions, r.email AS email FROM `users` AS u JOIN `roles` AS r ON u.role_id=r.id WHERE `username`=:username AND `password`=SHA1(:password)";
                        
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
                                $this->id=$res["id"];
                                $this->nome=$res["nome"];
                                $this->cognome=$res["cognome"];
                                $this->role_id=$res["role_id"];
                                $this->is_active=$res["is_active"];
                                $this->email=$res["email"];
                                $this->permissions=json_decode($res["permissions"]);
                                $out->status="OK";
                                $out->data=$this;
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
                            u.is_active as is_active
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

        public static function checkCanCreateUser($role_id){
            return ($role_id=="1"); // va implementato un check sul ruolo sulla base del json memorizzato
        }

        public static function checkToken($token){
            return ($token=="123456"); // va implementata una generazione token con controllo di scadenza e restituito un oggetto con anche i dati quali lo username
        }
    }
