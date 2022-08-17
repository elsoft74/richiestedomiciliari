<?php
    include_once("user.php");
    class Assistito {    
        public $id;
        public $nome;
        public $cognome;
        public $telefono;
        public $nascita;
        public $email;
        public $indirizzo;
        public $codicefiscale;
        public $note;
        public $isactive;

        function setId($val){
            $this->id=$val;
        }
        function setNome($val){
            $this->nome=$val;
        }
        function setCognome($val){
            $this->cognome=$val;
        }
        function setTelefono($val){
            $this->telefono=$val;
        }
        function setEmail($val){
            $this->email=$val;
        }
        function setIndirizzo($val){
            $this->indirizzo=$val;
        }
        function setCodiceFiscale($val){
            $this->codicefiscale=$val;
        }
        function setNote($val){
            $this->note=$val;
        }
        function setIsActive($val){
            $this->isactive=$val;
        }
        function setNascita($val){
            $this->nascita=$val;
        }

        function getId(){
            return $this->id;
        }
        function getNome(){
            return $this->nome;
        }
        function getCognome(){
            return $this->cognome;
        }
        function getTelefono(){
            return $this->telefono;
        }
        function getEmail(){
            return $this->email;
        }
        function getIndirizzo(){
            return $this->indirizzo;
        }
        function getCodiceFiscale(){
            return $this->codicefiscale;
        }
        function getnote(){
            return $this->note;
        }
        function getIsActive(){
            return $this->isactive;
        }
        function getNascita(){
            return $this->nascita;
        }

        public static function getAssistiti($username,$token){
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
                            $query="SELECT * FROM `assistiti`";
                            
                            $stmt = $conn->prepare($query);
                            $stmt->execute();
                            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
                            foreach($results as $res){
                                $assistito = new Assistito();
                                $assistito->setId($res['id']);
                                $assistito->setNome($res['nome']);
                                $assistito->setCognome($res['cognome']);
                                $assistito->setTelefono($res['telefono']);
                                $assistito->setEmail($res['email']);
                                $assistito->setIndirizzo($res['indirizzo']);
                                $assistito->setCodiceFiscale($res['codicefiscale']);
                                $assistito->setNote($res['note']);
                                $assistito->setIsActive($res['is_active']==1);
                                $assistito->setNascita($res['nascita']);
                                array_push($out->data,$assistito);
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
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {
                        $query="SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':username',$username,PDO::PARAM_STR);
                        $stmt->execute();
                        $res=$stmt->fetch(PDO::FETCH_ASSOC);
                        if (User::checkToken($token) && $res && $res['is_active']==1 AND User::checkCanCreateAssistito($res['role_id'])){
                            $query="SELECT COUNT(id) AS presente FROM `assistiti` AS a WHERE UPPER(a.codicefiscale)=UPPER(:codicefiscale)";
                            $codicefiscale=$this->getCodiceFiscale();
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':codicefiscale',$codicefiscale,PDO::PARAM_STR);
                            $stmt->execute();
                            $results=$stmt->fetch(PDO::FETCH_ASSOC);
                            if($results && $results['presente']==0){
                                $query="INSERT INTO `assistiti` (nome,cognome,codicefiscale,telefono,email,indirizzo,note,nascita) VALUES (:nome,:cognome,:codicefiscale,:telefono,:email,:indirizzo,:note,:nascita)";
                                $stmt = $conn->prepare($query);
                                $stmt->bindParam(':nome',$this->getNome(),PDO::PARAM_STR);
                                $stmt->bindParam(':cognome',$this->getCognome(),PDO::PARAM_STR);
                                $stmt->bindParam(':codicefiscale',$this->getCodiceFiscale(),PDO::PARAM_STR);
                                $stmt->bindParam(':telefono',$this->getTelefono(),PDO::PARAM_STR);
                                $stmt->bindParam(':email',$this->getEmail(),PDO::PARAM_STR);
                                $stmt->bindParam(':indirizzo',$this->getIndirizzo(),PDO::PARAM_STR);
                                $stmt->bindParam(':note',$this->getNote(),PDO::PARAM_STR);
                                $stmt->bindParam(':nascita',$this->getNascita(),PDO::PARAM_STR);
                                $stmt->execute();
                                $this->setId($conn->lastInsertId());
                                    if ($this->getId()!=0){
                                    $out->status="OK";
                                } else {
                                    throw new Exception("ERRORE-DI-INSERIMENTO");    
                                }
                            } else {
                                throw new Exception("CODICE-FISCALE-PRESENTE-IN-ANAGRAFICA");
                            }
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
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {
                        $query="SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':username',$username,PDO::PARAM_STR);
                        $stmt->execute();
                        $res=$stmt->fetch(PDO::FETCH_ASSOC);
                        if (User::checkToken($token) && $res && $res['is_active']==1 AND User::checkCanUpdateAssistito($res['role_id'])){
                            $query="SELECT COUNT(id) AS presente FROM `assistiti` AS a WHERE UPPER(a.codicefiscale)=UPPER(:codicefiscale)  AND NOT a.id=:id";
                            $codicefiscale=$this->getCodiceFiscale();
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':codicefiscale',$codicefiscale,PDO::PARAM_STR);
                            $stmt->bindParam(':id',$this->id,PDO::PARAM_INT);
                            $stmt->execute();
                            $results=$stmt->fetch(PDO::FETCH_ASSOC);
                            if($results && $results['presente']==0){
                                $query="UPDATE `assistiti` SET
                                nome=:nome,
                                cognome=:cognome,
                                codicefiscale=:codicefiscale,
                                telefono=:telefono,
                                email=:email,
                                indirizzo=:indirizzo,
                                note=:note,
                                nascita=:nascita
                                WHERE id=:id";
                                $stmt = $conn->prepare($query);
                                $stmt->bindParam(':nome',$this->nome,PDO::PARAM_STR);
                                $stmt->bindParam(':cognome',$this->cognome,PDO::PARAM_STR);
                                $stmt->bindParam(':codicefiscale',$codicefiscale,PDO::PARAM_STR);
                                $stmt->bindParam(':telefono',$this->telefono,PDO::PARAM_STR);
                                $stmt->bindParam(':email',$this->email,PDO::PARAM_STR);
                                $stmt->bindParam(':indirizzo',$this->indirizzo,PDO::PARAM_STR);
                                $stmt->bindParam(':note',$this->note,PDO::PARAM_STR);
                                $stmt->bindParam(':nascita',$this->nascita,PDO::PARAM_STR);
                                $stmt->bindParam(':id',$this->id,PDO::PARAM_INT);
                                $stmt->execute();
                                if ($stmt->rowCount()==1){
                                    $out->status="OK";
                                } else {
                                    throw new Exception("AGGIORNAMENTO-NON-ESEGUITO");    
                                }
                            } else {
                                throw new Exception("CODICE-FISCALE-PRESENTE-IN-ALTRA-ANAGRAFICA");
                            }
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
    
    }


