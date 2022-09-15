<?php
    include_once("user.php");
    class Assistito {    
        public $id;
        public $idUsca;
        public $nome;
        public $cognome;
        public $telefono1;
        public $telefono2;
        public $nascita;
        public $email;
        public $indirizzo;
        public $codicefiscale;
        public $note;
        public $isactive;
        public $usca;

        function setId($val){
            $this->id=$val;
        }
        function setIdUsca($val){
            $this->idUsca=$val;
        }
        function setUsca($val){
            $this->usca=$val;
        }
        function setNome($val){
            $this->nome=$val;
        }
        function setCognome($val){
            $this->cognome=$val;
        }
        function setTelefono1($val){
            $this->telefono1=$val;
        }
        function setTelefono2($val){
            $this->telefono2=$val;
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
        function getIdUsca(){
            return $this->idUsca;
        }
        function getUsca(){
            return $this->usca;
        }
        function getNome(){
            return $this->nome;
        }
        function getCognome(){
            return $this->cognome;
        }
        function getTelefono1(){
            return $this->telefono1;
        }
        function getTelefono2(){
            return $this->telefono2;
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

        public static function getAssistiti(/*$username,$token*/){
            $out = new stdClass();
            $out->status="KO";
            $out->data=[];
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {/*
                        $query="SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':username',$username,PDO::PARAM_STR);
                        $stmt->execute();
                        $res=$stmt->fetch(PDO::FETCH_ASSOC);
                        if (User::checkToken($token) && $res && $res['is_active']==1 AND User::checkCanCreateUser($res['role_id'])){*/

                            /*"SELECT
                                a.id AS id_assistito,
                                a.nome AS nome,
                                a.cognome AS cognome,
                                a.email AS email,
                                a.indirizzo AS indirizzo,
                                a.codicefiscale AS codicefiscale,
                                a.note AS note_assistito,
                                a.is_active AS assistito_is_active,
                                a.telefono1 AS telefono1,
                                a.telefono2 AS telefono2,
                                a.nascita AS nascita,
                                a.id_usca AS id_usca,
                                u.descrizione AS usca
                            FROM
                                `assistiti` AS a
                            LEFT JOIN `usca` AS u
                            ON
                                a.id_usca = u.id
                            WHERE
                                a.is_active = 1"
                             *
                             */
                            $query="SELECT * FROM `vista_assistiti`";
                            
                            $stmt = $conn->prepare($query);
                            $stmt->execute();
                            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
                            foreach($results as $res){
                                $assistito = new Assistito();
                                $assistito->setId($res['id']);
                                $assistito->setIdUsca($res['id_usca']);
                                $assistito->setNome($res['nome']);
                                $assistito->setCognome($res['cognome']);
                                $assistito->setTelefono1($res['telefono1']);
                                $assistito->setTelefono2($res['telefono2']);
                                $assistito->setEmail($res['email']);
                                $assistito->setIndirizzo($res['indirizzo']);
                                $assistito->setCodiceFiscale($res['codicefiscale']);
                                $assistito->setNote($res['note']);
                                $assistito->setIsActive($res['is_active']==1);
                                $assistito->setNascita($res['nascita']);
                                $assistito->setUsca($res['usca']);
                                array_push($out->data,$assistito);
                            }
                            $out->status="OK";
                        /*} else {
                            throw new Exception("OPERAZIONE-NON-PERMESSA");
                        } */
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
                                $query="INSERT INTO `assistiti` (nome,cognome,codicefiscale,telefono,email,indirizzo,note,nascita,id_usca) VALUES (:nome,:cognome,:codicefiscale,:telefono,:email,:indirizzo,:note,:nascita,:id_usca)";
                                $stmt = $conn->prepare($query);
                                $stmt->bindParam(':nome',$this->getNome(),PDO::PARAM_STR);
                                $stmt->bindParam(':cognome',$this->getCognome(),PDO::PARAM_STR);
                                $stmt->bindParam(':codicefiscale',$this->getCodiceFiscale(),PDO::PARAM_STR);
                                $stmt->bindParam(':telefono1',$this->getTelefono1(),PDO::PARAM_STR);
                                $stmt->bindParam(':telefono2',$this->getTelefono2(),PDO::PARAM_STR);
                                $stmt->bindParam(':email',$this->getEmail(),PDO::PARAM_STR);
                                $stmt->bindParam(':indirizzo',$this->getIndirizzo(),PDO::PARAM_STR);
                                $stmt->bindParam(':note',$this->getNote(),PDO::PARAM_STR);
                                $stmt->bindParam(':nascita',$this->getNascita(),PDO::PARAM_STR);
                                $stmt->bindParam(':id_usca',$this->getIdUsca(),PDO::PARAM_INT);
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
                                telefono1=:telefono1,
                                telefono2=:telefono2,
                                email=:email,
                                indirizzo=:indirizzo,
                                note=:note,
                                nascita=:nascita,
                                id_usca=:id_usca
                                WHERE id=:id";
                                $stmt = $conn->prepare($query);
                                $stmt->bindParam(':nome',$this->nome,PDO::PARAM_STR);
                                $stmt->bindParam(':cognome',$this->cognome,PDO::PARAM_STR);
                                $stmt->bindParam(':codicefiscale',$codicefiscale,PDO::PARAM_STR);
                                $stmt->bindParam(':telefono1',$this->telefono1,PDO::PARAM_STR);
                                $stmt->bindParam(':telefono2',$this->telefono2,PDO::PARAM_STR);
                                $stmt->bindParam(':email',$this->email,PDO::PARAM_STR);
                                $stmt->bindParam(':indirizzo',$this->indirizzo,PDO::PARAM_STR);
                                $stmt->bindParam(':note',$this->note,PDO::PARAM_STR);
                                $stmt->bindParam(':nascita',$this->nascita,PDO::PARAM_STR);
                                $stmt->bindParam(':id',$this->id,PDO::PARAM_INT);
                                $stmt->bindParam(':id_usca',$this->idUsca,PDO::PARAM_INT);
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


