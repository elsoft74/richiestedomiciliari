<?php
include_once("user.php");
include_once("assistito.php");
include_once("db.php");
class Tampone
{
    public $id;
    public $idAssistito;
    public $dataEsecuzione;
    public $dataConsigliata;
    public $idStatus;
    public $isactive;
    public $created;
    public $createdBy;
    public $lastUpdate;
    public $lastUpdateBy;
    public $deletedDate;
    public $deletedBy;
    public $status;

    function __construct() {
        $this->id = null;
        $this->idAssistito = null;
        $this->dataEsecuzione = null;
        $this->dataConsigliata = null;
        $this->idStatus = null;
        $this->isactive = null;
        $this->created = null;
        $this->createdBy = null;
        $this->lastUpdate = null;
        $this->lastUpdateBy = null;
        $this->deletedDate = null;
        $this->deletedBy = null;
        $this->status = null;
    }

    public function setId($val){
        $this->id=$val;
    }

    public function getId(){
        return $this->id;
    }

    public function setIdAssistito($val){
        $this->idAssistito=$val;
    }

    public function getIdAssistito(){
        return $this->idAssistito;
    }


    public function setDataEsecuzione($val){
        $this->dataEsecuzione=$val;
    }

    public function getDataEsecuzione(){
        return $this->dataEsecuzione;
    }

    public function setDataConsigliata($val){
        $this->dataConsigliata=$val;
    }

    public function getDataConsigliata(){
        return $this->dataConsigliata;
    }

    public function setIsActive($val){
        $this->isActive=$val;
    }

    public function getIsActive(){
        return $this->isActive;
    }

    public function setCreated($val){
        $this->created=$val;
    }

    public function getCreated(){
        return $this->created;
    }

    public function setCreatedBy($val){
        $this->createdBy=$val;
    }

    public function getCreatedBy(){
        return $this->createdBy;
    }

    public function setLastUpdate($val){
        $this->lastUpdate=$val;
    }

    public function getLastUpdate(){
        return $this->lastUpdate;
    }

    public function setLastUpdateBy($val){
        $this->lastUpdateBy=$val;
    }

    public function getLastUpdateBy(){
        return $this->lastUpdateBy;
    }

    public function setDeletedDate($val){
        $this->deletedDate=$val;
    }

    public function getDeletedDate(){
        return $this->deletedDate;
    }

    public function setDeletedBy($val){
        $this->deletedBy=$val;
    }

    public function getDeletedBy(){
        return $this->deletedBy;
    }

    public function setIdStatus($val){
        $this->idStatus=$val;
    }

    public function getIdStatus(){
        return $this->idStatus;
    }

    public function setStatus($val){
        $this->status=$val;
    }

    public function getStatus(){
        return $this->status;
    }


    // public function getDetails()
    // {
    //     if ($this->id != null) {
    //         try {
    //             $conn = DB::conn();
    //             if ($conn != null) {

    //                 $query = 'SELECT *
    //                         FROM `tamponi` AS t
    //                         WHERE t.id=:id';

    //                 $stmt = $conn->prepare($query);
    //                 $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
    //                 $stmt->execute();

    //                 $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //                 if (!$res) {
    //                     throw new Exception("ERRORE-NELLA-RICERCA-PER-LA-RICHIESTA-" . $this->id);
    //                 } else {
    //                     //var_dump($res);
    //                     $res = $res[0]; // Ci sarà un solo risultato utile
    //                     $this->setIdTipologia($res['id_tipologia']);
    //                     $this->setIdPriorita($res['id_priorita']);
    //                 }
    //             } else {
    //                 throw new Exception("DB-CONNECTION-ERROR");
    //             }
    //         } catch (Exception $e) {
    //             $conn = null;
    //         }
    //     } else {
    //         throw new Exception("EMPTY-REQUEST-ERROR");
    //     }
    // }

    public static function getSwabs($activeUsca)
    {
        //$val null o "A" restituisce tutte le richieste Attive
        //$val "T" restituisce tutte le richieste
        //$vak "C" restitiosce le richieste inattive (Cancellate)

        $out = new stdClass();
        $out->status = "KO";
        $out->data = [];
        try {
            $conn = DB::conn();
            if ($conn != null) {
                try {
                    /*
                    $query = "SELECT a.id AS id_assistito,
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
                    a.id_usca AS id_usca,
                    t.id as id_tampone,
                    t.data_esecuzione AS data_esecuzione,
                    t.data_consigliata AS data_consigliata,
                    t.is_active AS tampone_is_active,
                    t.status AS id_status,
                    s.descrizione AS status,
                    t.created AS created,
                    t.created_by AS created_by,
                    t.last_update AS last_update,
                    t.last_update_by AS last_update_by,
                    u.descrizione AS usca,
                    s.to_show AS to_show
                    FROM `assistiti` AS a JOIN `tamponi` AS t ON a.id=t.id_assistito
                    LEFT JOIN `stati_tamponi` AS s ON t.status=s.id
                    LEFT JOIN `usca` AS u ON a.id_usca=u.id
                    WHERE a.is_active=1"
                    */

                    $query = "SELECT * FROM `vista_tamponi` WHERE tampone_is_active=1 AND to_show=1 AND DATEDIFF(CURDATE(), data_esecuzione) < 8 ORDER BY data_esecuzione";
                    
                    if($activeUsca!="ALL"){
                        $query.=" AND id_usca=:id_usca";
                    }
                    
                    $stmt = $conn->prepare($query);
                    if($activeUsca!="ALL"){
                        $stmt->bindParam(':id_usca',$activeUsca,PDO::PARAM_INT);
                    }

                    $stmt->execute();

                    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($res as $r) {
                        $tmp = new StdClass();
                        $tmp->id = $r['id_tampone'];
                        $tmp->idAssistito=$r['id_assistito'];
                        $tmp->nome=$r['nome'];
                        $tmp->cognome=$r['cognome'];
                        $tmp->email=$r['email'];
                        $tmp->telefono1=$r['telefono1'];
                        $tmp->telefono2=$r['telefono2'];
                        $tmp->telefono3=$r['telefono3'];
                        $tmp->indirizzo=$r['indirizzo'];
                        $tmp->codiceFiscale=$r['codicefiscale'];
                        $tmp->noteAssistito=$r['note_assistito'];
                        $tmp->nascita=$r['nascita'];
                        $tmp->assistitoIsActive=$r['assistito_is_active'];
                        $tmp->tamponeIsActive=$r['tampone_is_active'];
                        $tmp->idStatus=$r['id_status'];
                        $tmp->status=$r['status'];
                        $tmp->idTampone=$r['id_tampone'];
                        $tmp->dataEsecuzione=$r['data_esecuzione'];
                        $tmp->dataConsigliata=$r['data_consigliata'];
                        $tmp->idUsca=$r['id_usca'];
                        $tmp->usca=$r['usca'];
                        $tmp->created=$r['created'];
                        $tmp->createdByNomeCognome=$r['created_by'];
                        $tmp->last_update=$r['last_update'];
                        $tmp->lastUpdateByNomeCognome=$r['last_update_by'];
                        $contatti = [];
                        if ($r['telefono1']!=""){
                            array_push($contatti,$r['telefono1']);
                        }
                        if ($r['telefono2']!=""){
                            array_push($contatti,$r['telefono2']);
                        }
                        if ($r['telefono3']!=""){
                            array_push($contatti,$r['telefono3']);
                        }
                        if ($r['email']!=""){
                            array_push($contatti,$r['email']);
                        }
                        $tmp->contatti=json_encode($contatti);

                        array_push($out->data, $tmp);
                    }
                    $out->lastRead = (new DateTime())->format('Y-m-d H:i:s');

                    $out->status = "OK";
                    $out->lastRead = (new DateTime())->format('Y-m-d H:i:s');
                } catch (Exception $ex) {
                    $out->error = $ex->getMessage();
                }
            } else {
                $out->error = "DB-CONNECTION-ERROR";
            }
        } catch (Exception $e) {
            $conn = null;
        }
        return $out;
    }

    public function getData()
    {
        $out = new stdClass();
        $out->status = "KO";
        $out->data = [];
        try {
            $conn = DB::conn();
            if ($conn != null) {
                try {
                    if($this->id==null){
                        throw new Exception("ID-NULLO");
                    }
                    $query = "SELECT * FROM `tamponi` WHERE id=:id";
                    $stmt = $conn->prepare($query);
                    $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
                    $stmt = $conn->prepare($query);
                    $stmt->execute();

                    $res = $stmt->fetch(PDO::FETCH_ASSOC);
                    if ($res) {
                        $this->nome=$r['nome'];
                        $this->tamponeIsActive=$r['is_active'];
                        $this->status=$r['status'];
                        $this->dataEsecuzione=$r['data_esecuzione'];
                        $this->dataConsigliata=$r['data_consigliata'];
                        $this->created=$r['created'];
                        $this->createdBy=$r['created_by'];
                        $this->last_update=$r['last_update'];
                        $this->lastUpdateBy=$r['last_update_by'];
                    }

                    $out->status = "OK";
                } catch (Exception $ex) {
                    $out->error = $ex->getMessage();
                }
            } else {
                $out->error = "DB-CONNECTION-ERROR";
            }
        } catch (Exception $e) {
            $conn = null;
        }
        return $out;
    }

    public function insert($username,$token)
    {
        $out = new stdClass();
        $out->status = "KO";
        $out->data = null;
        try {
            $conn = DB::conn();
            if ($conn != null) {
                try {
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $query="SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                    $stmt = $conn->prepare($query);
                    $stmt->bindParam(':username',$username,PDO::PARAM_STR);
                    $stmt->execute();
                    $res=$stmt->fetch(PDO::FETCH_ASSOC);
                    if (User::checkToken($token) && $res && $res['is_active']==1 AND User::checkCanUpdateRequest($res['role_id'])){
                        $query="SELECT COUNT(id) AS presente FROM `tamponi` WHERE id_assistito = :id_assistito AND data_esecuzione = :data_esecuzione";

                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':id_assistito', $this->idAssistito, PDO::PARAM_INT);
                        $stmt->bindParam(':data_esecuzione', $this->dataEsecuzione, PDO::PARAM_STR);
                        $stmt->execute();

                        $res = $stmt->fetch(PDO::FETCH_ASSOC);
                        if ($res){
                            if ($res['presente']=="0") {
                                $query = "INSERT INTO `tamponi` (
                                    id_assistito, data_esecuzione,data_consigliata,status,created_by)
                                    VALUES (:id_assistito,:data_esecuzione,:data_consigliata,:status,:created_by)";
    
                                $stmt = $conn->prepare($query);
    
                                $stmt->bindParam(':id_assistito', $this->idAssistito, PDO::PARAM_INT);
                                $stmt->bindParam(':data_esecuzione', $this->dataEsecuzione, PDO::PARAM_STR);
                                $stmt->bindParam(':data_consigliata', $this->dataConsigliata, PDO::PARAM_STR);
                                $stmt->bindParam(':status', $this->idStatus, PDO::PARAM_INT);
                                // $stmt->bindParam(':created', $this->created, PDO::PARAM_STR);
                                $stmt->bindParam(':created_by', $this->createdBy, PDO::PARAM_INT);
    
                                $stmt->execute();
                                $this->setId($conn->lastInsertId());
                                    if ($this->getId()!=0){
                                    $out->data=$this->getId();
                                    $out->status="OK";
                                } else {
                                    throw new Exception("ERRORE-DI-INSERIMENTO");    
                                }
                                
                            }
                            $query="UPDATE `updates` SET last_update_ts=LOCALTIMESTAMP() WHERE table_name='tamponi'";
                                    $stmt = $conn->prepare($query);
                                    $stmt->execute();
                            
                        } else {

                            throw new Exception("ERRORE-DI-INSERIMENTO");    
                        }
                    } else {
                        throw new Exception("OPERAZIONE-NON-PERMESSA");
                    } 
                    
                } catch (Exception $ex) {
                    $out->status="KO";
                    $out->error = $ex->getMessage();
                    $out->errorData = $this;
                }
            } else {
                throw new Exception("DB-CONNECTION-ERROR");
            }
        } catch (Exception $ex) {
            $conn = null;
            $out->status="KO";
            $out->error = $ex->getMessage();
        }
        return $out;
    }

    public function update($username,$token)
    {
        $out = new stdClass();
        $out->status = "KO";
        try {
            if ($this->getId() != null) {
                
                $conn = DB::conn();
                if ($conn != null) {
                    try {
                        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $query="SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':username',$username,PDO::PARAM_STR);
                        $stmt->execute();
                        $res=$stmt->fetch(PDO::FETCH_ASSOC);
                        if (User::checkToken($token) && $res && $res['is_active']==1 AND User::checkCanUpdateRequest($res['role_id'])){
                            $query = "UPDATE `tamponi` SET
                            status=:status,
                            last_update=:last_update,
                            last_update_by=:last_update_by
                            WHERE `id`=:id";

                        $stmt = $conn->prepare($query);

                        $stmt->bindParam(':status', $this->status, PDO::PARAM_INT);
                        $stmt->bindParam(':last_update', $this->lastUpdate, PDO::PARAM_STR);
                        $stmt->bindParam(':last_update_by', $this->lastUpdateBy, PDO::PARAM_INT);
                        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

                        $stmt->execute();
                        $out->num = $stmt->rowCount();

                        if ($out->num != 1) {
                            throw new Exception("UPDATE-ERROR");
                        }

                        $query="UPDATE `updates` SET last_update_ts=LOCALTIMESTAMP() WHERE table_name='tamponi'";
                        $stmt = $conn->prepare($query);
                        $stmt->execute();
                        if ($stmt->rowCount()==1){
                            $out->status="OK";
                        }
                        } else {
                            throw new Exception("OPERAZIONE-NON-PERMESSA");
                        } 
                        
                    } catch (Exception $ex) {
                        $out->status="KO";
                        $out->error = $ex->getMessage();
                    }
                } else {
                    throw new Exception("DB-CONNECTION-ERROR");
                }
            } else {
                throw new Exception("EMPTY-REQUEST");
            }
        } catch (Exception $ex) {
            $conn = null;
            $out->status="KO";
            $out->error = $ex->getMessage();
        }
        return $out;
    }

    public static function getStatiTamponi(){
        $out = new stdClass();
        $out->status="KO";
        try {
            $conn=DB::conn();
            if ($conn!=null){
                try {
                    $query="SELECT id,descrizione FROM `stati_tamponi` WHERE `is_active`=1";
                    
                    $stmt = $conn->prepare($query);
                    $stmt->execute();
                    $res=$stmt->fetchAll(PDO::FETCH_ASSOC);
                    $out->data=$res;                    
                    $out->status="OK";
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
