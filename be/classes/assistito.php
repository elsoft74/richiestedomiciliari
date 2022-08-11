<?php
    class Assistito {    
        public $id;
        public $nome;
        public $cognome;
        public $telefono;
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

        public static function checkCanCreateUser($role_id){
            return ($role_id=="1"); // va implementato un check sul ruolo sulla base del json memorizzato
        }

        public static function checkToken($token){
            return ($token=="123456"); // va implementata una generazione token con controllo di scadenza e restituito un oggetto con anche i dati quali lo username
        }
    }
