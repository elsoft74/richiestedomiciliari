<?php
include_once("user.php");
include_once("db.php");
class Tampone
{
    public $id;
    public $idAssistito;
    public $dataEsecuzione;
    public $dataConsigliata;
    public $isProgrammato;
    public $isactive;
    public $created;
    public $createdBy;
    public $lastUpdate;
    public $lastUpdateBy;
    public $deletedDate;
    public $deletedBy;

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

    public function setIsProgrammato($val){
        $this->isProgrammato=$val;
    }

    public function getIsProgrammato(){
        return $this->isProgrammato;
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

    public static function getSwabs()
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
                    a.telefono AS telefono,
                    a.nascita AS nascita,
                    a.id_usca AS id_usca,
                    t.id as id_tampone,
                    t.data_esecuzione AS data_esecuzione,
                    t.data_consigliata AS data_consigliata,
                    t.is_active AS tampone_is_active,
                    t.is_programmed AS tampone_is_programmed,
                    t.created AS created,
                    t.created_by AS created_by,
                    t.last_update AS last_update,
                    t.last_update_by AS last_update_by,
                    u.descrizione AS usca
                    FROM `assistiti` AS a LEFT JOIN `tamponi` AS t ON a.id=t.id_assistito
                    JOIN `usca` AS u ON a.id_usca=u.id
                    WHERE a.is_active=1";
                    */

                    $query = "SELECT * FROM `vista_tamponi` WHERE tampone_is_active=1";
                    

                    $stmt = $conn->prepare($query);
                    $stmt->execute();

                    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($res as $r) {
                        $tmp = new StdClass();
                        $tmp->idAssistito=$r['id_assistito'];
                        $tmp->nome=$r['nome'];
                        $tmp->cognome=$r['cognome'];
                        $tmp->email=$r['email'];
                        $tmp->telefono=$r['telefono'];
                        $tmp->indirizzo=$r['indirizzo'];
                        $tmp->codiceFiscale=$r['codicefiscale'];
                        $tmp->noteAssistito=$r['note_assistito'];
                        $tmp->nascita=$r['nascita'];
                        $tmp->assistitoIsActive=$r['assistito_is_active'];
                        $tmp->tamponeIsActive=$r['tampone_is_active'];
                        $tmp->tamponeIsProgrammed=$r['tampone_is_programmed']=="1";
                        $tmp->idTampone=$r['id_tampone'];
                        $tmp->dataEsecuzione=$r['data_esecuzione'];
                        $tmp->dataConsigliata=$r['data_consigliata'];
                        $tmp->idUsca=$r['id_usca'];
                        $tmp->usca=$r['usca'];
                        $tmp->created=$r['created'];
                        $tmp->createdByNomeCognome=$r['created_by'];
                        $tmp->last_update=$r['last_update'];
                        $tmp->lastUpdateByNomeCognome=$r['last_update_by'];

                        array_push($out->data, $tmp);
                    }

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

    // public function insert($username,$token)
    // {
    //     $out = new stdClass();
    //     $out->status = "KO";
    //     try {
    //         $conn = DB::conn();
    //         if ($conn != null) {
    //             try {
    //                 $query="SELECT is_active, role_id, id_usca FROM `users` AS u WHERE u.username=:username";
    //                     $stmt = $conn->prepare($query);
    //                     $stmt->bindParam(':username',$username,PDO::PARAM_STR);
    //                     $stmt->execute();
    //                     $res=$stmt->fetch(PDO::FETCH_ASSOC);
    //                     if (User::checkToken($token) && $res && $res['is_active']==1 AND User::checkCanCreateRequest($res['role_id'])){
    //                         $this->idUsca=$res['id_usca'];
    //                         $query = "INSERT INTO `richieste` (
    //                             `id_assistito`,
    //                             `id_tipologia`,
    //                             `id_priorita`,
    //                             `id_usca`,
    //                             `data`,
    //                             `note`,
    //                             `created_by`
    //                         ) VALUES (:id_assistito,
    //                             :id_tipologia,
    //                             :id_priorita,
    //                             :id_usca,
    //                             :data,
    //                             :note,
    //                             :created_by)";

    //                         $stmt = $conn->prepare($query);
    //                         $stmt->bindParam(':id_assistito', $this->idAssistito, PDO::PARAM_INT);
    //                         $stmt->bindParam(':id_tipologia', $this->idTipologia, PDO::PARAM_INT);
    //                         $stmt->bindParam(':id_priorita', $this->idPriorita, PDO::PARAM_INT);
    //                         $stmt->bindParam(':id_usca', $this->idUsca, PDO::PARAM_INT);
    //                         $stmt->bindParam(':data', $this->data, PDO::PARAM_STR);
    //                         $stmt->bindParam(':note', $this->note, PDO::PARAM_STR);
    //                         $stmt->bindParam(':created_by', $this->createdBy, PDO::PARAM_INT);

    //                         $stmt->execute();

    //                         $this->setId($conn->lastInsertId());

    //                         if ($this->id != 0) {
    //                             $out->status = "OK";
    //                         } else {
    //                             $out->errorInfo=$conn->errorInfo();
    //                             $out->errorCode=$conn->errorCode();
    //                             throw new Exception("Errore d'inserimento");
    //                         } 
    //                     } else {
    //                         throw new Exception("OPERAZIONE-NON-PERMESSA");
    //                     } 
                    
    //             } catch (Exception $ex) {
    //                 $out->error = $ex->getMessage();
    //             }
    //         } else {
    //             throw new Exception("DB-CONNECTION-ERROR");
    //         }
    //     } catch (Exception $ex) {
    //         $conn = null;
    //         $out->error = $ex->getMessage();
    //     }
    //     //file_put_contents("../log/dbtest.log",(new DateTime("now"))->format("Y-m-d H:i").$msg."\n",FILE_APPEND);
    //     return $out;
    // }

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
                            $query = "UPDATE `richieste` SET
                            id_tipologia=:id_tipologia,
                            id_priorita=:id_priorita,
                            data=:data,
                            note=:note,
                            last_update=:last_update,
                            last_update_by=:last_update_by
                            WHERE `id`=:id";

                        $stmt = $conn->prepare($query);

                        $stmt->bindParam(':id_tipologia', $this->idTipologia, PDO::PARAM_INT);
                        $stmt->bindParam(':id_priorita', $this->idPriorita, PDO::PARAM_INT);
                        $stmt->bindParam(':data', $this->data, PDO::PARAM_STR);
                        $stmt->bindParam(':note', $this->note, PDO::PARAM_STR);
                        $stmt->bindParam(':last_update', $this->lastUpdate, PDO::PARAM_STR);
                        $stmt->bindParam(':last_update_by', $this->lastUpdateBy, PDO::PARAM_INT);
                        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

                        $stmt->execute();
                        $out->num = $stmt->rowCount();

                        if ($out->num != 1) {
                            throw new Exception("UPDATE-ERROR");
                        }

                        $out->status = "OK";
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

    public function delete($username,$token)
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
                        if (User::checkToken($token) && $res && $res['is_active']==1 AND User::checkCanDeleteRequest($res['role_id'])){
                            $query = "UPDATE `tamponi` SET
                            is_active=0,
                            deleted_date=:deleted_date,
                            deleted_by=:deleted_by
                            WHERE `id`=:id";

                        $stmt = $conn->prepare($query);

                        $stmt->bindParam(':deleted_date', $this->deletedDate, PDO::PARAM_STR);
                        $stmt->bindParam(':deleted_by', $this->deletedBy, PDO::PARAM_INT);
                        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

                        $stmt->execute();
                        $out->num = $stmt->rowCount();

                        if ($out->num != 1) {
                            throw new Exception("UPDATE-ERROR");
                        }

                        $out->status = "OK";
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
}
