<?php
    include_once("user.php");
    include_once("db.php");
    class Assistito {    
        public $id;
        public $idUsca;
        public $nome;
        public $cognome;
        public $telefono1;
        public $telefono2;
        public $telefono3;
        public $nascita;
        public $eta;
        public $email;
        public $indirizzo;
        public $codiceFiscale;
        public $note;
        public $isactive;
        public $usca;
        public $contatti;

        function __construct() {
            $id = null;
            $idUsca = null;
            $nome = null;
            $cognome = null;
            $telefono1 = null;
            $telefono2 = null;
            $telefono3 = null;
            $nascita = null;
            $email = null;
            $indirizzo = null;
            $codiceFiscale = null;
            $note = null;
            $isactive = null;
            $usca = null;
            $eta = null;
            $contatti = null;
        }

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
        function setTelefono3($val){
            $this->telefono3=$val;
        }
        function setEmail($val){
            $this->email=$val;
        }
        function setIndirizzo($val){
            $this->indirizzo=$val;
        }
        function setCodiceFiscale($val){
            $this->codiceFiscale=$val;
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
        function setEta($val){
            $this->eta=$val;
        }
        function setContatti($val){
            $this->contatti=$val;
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
        function getTelefono3(){
            return $this->telefono3;
        }
        function getEmail(){
            return $this->email;
        }
        function getIndirizzo(){
            return $this->indirizzo;
        }
        function getCodiceFiscale(){
            return $this->codiceFiscale;
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
        function getEta(){
            return $this->eta;
        }
        function getContatti(){
            return $this->contatti;
        }

        public static function getAssistiti($activeUsca/*$username,$token*/){
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

                            /*"CREATE OR REPLACE
 ALGORITHM = UNDEFINED
 VIEW `vista_assistiti`
 AS SELECT
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
                                a.telefono3 AS telefono3,
                                a.nascita AS nascita,
                                TIMESTAMPDIFF(YEAR,nascita,now()) as eta,
                                a.id_usca AS id_usca,
                                a.note AS note,
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
                            if($activeUsca!="ALL"){
                                $query.=" WHERE id_usca=:id_usca";
                            }
                            
                            $stmt = $conn->prepare($query);
                            if($activeUsca!="ALL"){
                                $stmt->bindParam(':id_usca',$activeUsca,PDO::PARAM_INT);
                            }
                            $stmt->execute();
                            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
                            foreach($results as $res){
                                $assistito = new Assistito();
                                $assistito->setId($res['id_assistito']);
                                $assistito->setIdUsca($res['id_usca']);
                                $assistito->setNome($res['nome']);
                                $assistito->setCognome($res['cognome']);
                                $assistito->setTelefono1($res['telefono1']);
                                $assistito->setTelefono2($res['telefono2']);
                                $assistito->setTelefono3($res['telefono3']);
                                $assistito->setEmail($res['email']);
                                $assistito->setIndirizzo($res['indirizzo']);
                                $assistito->setCodiceFiscale($res['codicefiscale']);
                                $assistito->setNote($res['note']);
                                $assistito->setIsActive($res['is_active']==1);
                                $assistito->setNascita($res['nascita']);
                                $assistito->setEta($res['eta']);
                                $assistito->setUsca($res['usca']);
                                $contatti = [];
                                if ($res['telefono1']!=""){
                                    array_push($contatti,$res['telefono1']);
                                }
                                if ($res['telefono2']!=""){
                                    array_push($contatti,$res['telefono2']);
                                }
                                if ($res['telefono3']!=""){
                                    array_push($contatti,$res['telefono3']);
                                }
                                if ($res['email']!=""){
                                    array_push($contatti,$res['email']);
                                }
                                $assistito->setContatti(json_encode($contatti));
                                array_push($out->data,$assistito);
                            }
                            $out->lastRead = (new DateTime())->format('Y-m-d H:i:s');
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
                                $query="INSERT INTO `assistiti` (nome,cognome,codicefiscale,telefono1,telefono2,telefono3,email,indirizzo,note,nascita,id_usca) VALUES (:nome,:cognome,:codicefiscale,:telefono1,:telefono2,:telefono3,:email,:indirizzo,:note,:nascita,:id_usca)";
                                $stmt = $conn->prepare($query);
                                $stmt->bindParam(':nome',$this->nome,PDO::PARAM_STR);
                                $stmt->bindParam(':cognome',$this->cognome,PDO::PARAM_STR);
                                $stmt->bindParam(':codicefiscale',$this->codiceFiscale,PDO::PARAM_STR);
                                $stmt->bindParam(':telefono1',$this->telefono1,PDO::PARAM_STR);
                                $stmt->bindParam(':telefono2',$this->telefono2,PDO::PARAM_STR);
                                $stmt->bindParam(':telefono3',$this->telefono3,PDO::PARAM_STR);
                                $stmt->bindParam(':email',$this->email,PDO::PARAM_STR);
                                $stmt->bindParam(':indirizzo',$this->indirizzo,PDO::PARAM_STR);
                                $stmt->bindParam(':note',$this->note,PDO::PARAM_STR);
                                $stmt->bindParam(':nascita',$this->nascita,PDO::PARAM_STR);
                                $stmt->bindParam(':id_usca',$this->idUsca,PDO::PARAM_INT);
                                $stmt->execute();
                                $this->setId($conn->lastInsertId());
                                    if ($this->getId()!=0){
                                        $query="UPDATE `updates` SET last_update_ts=LOCALTIMESTAMP() WHERE table_name='assistiti'";
                                        $stmt = $conn->prepare($query);
                                        $stmt->execute();
                                        if ($stmt->rowCount()==1){
                                            $out->status="OK";
                                        }
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
                                telefono3=:telefono3,
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
                                $stmt->bindParam(':telefono3',$this->telefono3,PDO::PARAM_STR);
                                $stmt->bindParam(':email',$this->email,PDO::PARAM_STR);
                                $stmt->bindParam(':indirizzo',$this->indirizzo,PDO::PARAM_STR);
                                $stmt->bindParam(':note',$this->note,PDO::PARAM_STR);
                                $stmt->bindParam(':nascita',$this->nascita,PDO::PARAM_STR);
                                $stmt->bindParam(':id',$this->id,PDO::PARAM_INT);
                                $stmt->bindParam(':id_usca',$this->idUsca,PDO::PARAM_INT);
                                $stmt->execute();
                                if ($stmt->rowCount()==1){
                                    $query="UPDATE `updates` SET last_update_ts=LOCALTIMESTAMP() WHERE table_name='assistiti'";
                                    $stmt = $conn->prepare($query);
                                    $stmt->execute();
                                    if ($stmt->rowCount()==1){
                                        $out->status="OK";
                                    }
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
        
        public function getIdOrInsert($username,$token){
            $out = new stdClass();
            $out->status="KO";
            $out->data=null;
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
                            $query="SELECT id FROM `assistiti` AS a WHERE UPPER(a.codicefiscale)=UPPER(:codicefiscale)";
                            $codicefiscale=$this->getCodiceFiscale();
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':codicefiscale',$codicefiscale,PDO::PARAM_STR);
                            $stmt->execute();
                            $results=$stmt->fetch(PDO::FETCH_ASSOC);
                            if($results){
                                $this->id=$results['id'];
                            } else {
                                $this->insert($username,$token);
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
                    throw new Exception("DB-CONNECTION-ERROR");
                }
            } catch(Exception $e){
                $conn=null;
            }
            return $out;
        }
    
    }


