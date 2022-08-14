<?php
class Richiesta
{
    public $id;
    public $id_tipologia;
    public $id_priorita;
    public $data;
    public $note;
    public $is_active;
    public $created;
    public $created_by;
    public $last_update;
    public $last_update_by;

    



    public function getDetails()
    {
        if ($this->id != null) {
            try {
                $conn = DB::conn();
                if ($conn != null) {

                    $query = 'SELECT *
                            FROM `richieste` AS r
                            WHERE r.id=:id';

                    $stmt = $conn->prepare($query);
                    $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
                    $stmt->execute();

                    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    if (!$res) {
                        throw new Exception("ERRORE-NELLA-RICERCA-PER-LA-RICHIESTA-" . $this->id);
                    } else {
                        //var_dump($res);
                        $res = $res[0]; // Ci sarà un solo risultato utile
                        $this->setIdTipologia($res['id_tipologia']);
                        $this->setIdPriorita($res['id_priorita']);
                    }
                } else {
                    throw new Exception("DB-CONNECTION-ERROR");
                }
            } catch (Exception $e) {
                $conn = null;
            }
        } else {
            throw new Exception("EMPTY-REQUEST-ERROR");
        }
    }

    public static function getRequestes()
    {
        //$val null o "A" restituisce tutte le richieste Attive
        //$val "T" restituisce tutte le richieste
        //$vak "C" restitiosce le richieste inattive (Cancellate)

        $out = new stdClass();
        $out->status = "KO";
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
                    r.id as id_richiesta,
                    r.id_tipologia AS id_tipologia,
                    r.id_priorita AS id_priorita,
                    r.data AS data,
                    r.note AS note_richiesta,
                    r.is_active AS richiesta_is_active,
                    r.created AS created,
                    r.created_by AS created_by,
                    r.last_update AS last_update,
                    r.last_update_by AS last_update_by
                    FROM `assistiti` AS a LEFT JOIN `richieste` AS r ON a.id=r.id_assistito
                    WHERE a.is_active=1";
                    */

                    $query = "SELECT * FROM `vista_richieste` WHERE richiesta_is_active=1 OR richiesta_is_active IS null";
                    

                    $stmt = $conn->prepare($query);
                    $stmt->execute();

                    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $out->data = $res;
                    // if (!$res) {
                    //     throw new Exception("ERRORE-NELLA-RICERCA");
                    // }
                    $out->data = [];
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
                        $tmp->assistitoIsActive=$r['assistito_is_active'];
                        $tmp->idRichiesta=$r['id_richiesta'];
                        $tmp->idTipologia=$r['id_tipologia'];
                        $tmp->idPriorita=$r['id_priorita'];
                        $tmp->data=$r['data'];
                        $tmp->noteRichiesta=$r['note_richiesta'];
                        $tmp->richiestaIsActive=$r['richiesta_is_active'];
                        $tmp->created=$r['created'];
                        $tmp->createdByNomeCognome=$r['created_by'];
                        $tmp->last_update=$r['last_update'];
                        $tmp->lastUpdateByNomeCognome=$r['last_update_by'];

                        array_push($out->data, $tmp);
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
        //file_put_contents("../log/dbtest.log",(new DateTime("now"))->format("Y-m-d H:i").$msg."\n",FILE_APPEND);
        return $out;
    }

    public function insertRequest()
    {
        $out = new stdClass();
        $out->status = "KO";
        try {
            $conn = DB::conn();
            if ($conn != null) {
                try {
                    $query = "SELECT COUNT(*) AS presenti FROM `richieste`
                    WHERE `is_active` = 1 AND
                    UPPER(`codicefiscale`)=UPPER(:codicefiscale)";

                    $stmt = $conn->prepare($query);
                    $stmt->bindParam(':codicefiscale', $this->codiceFiscale, PDO::PARAM_STR);
                    //$stmt->bindParam(':numero', $this->numero, PDO::PARAM_STR);
                    $stmt->execute();

                    $res = $stmt->fetch(PDO::FETCH_ASSOC);
                    // $out->presenti = $res;
                    if ($res && $res['presenti'] == 0) {
                        $query = "INSERT INTO `richieste` (
                            `nome`,
                            `cognome`,
                            `codicefiscale`,
                            `email`,
                            `numero`,
                            `data_ric`,
                            `data_ultima_com`,
                            `fase`,
                            `motivo`,
                            `note`,
                            `created_by`
                        ) VALUES (:nome,
                            :cognome,
                            :codicefiscale,
                            :email,
                            :numero,
                            :data_ric,
                            :data_ultima_com,
                            :fase,
                            :motivo,
                            :note,
                            :created_by)";

                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':nome', $this->nome, PDO::PARAM_STR);
                        $stmt->bindParam(':cognome', $this->cognome, PDO::PARAM_STR);
                        $stmt->bindParam(':codicefiscale', $this->codiceFiscale, PDO::PARAM_STR);
                        $stmt->bindParam(':email', $this->email, PDO::PARAM_STR);
                        $stmt->bindParam(':numero', $this->numero, PDO::PARAM_STR);
                        $stmt->bindParam(':data_ric', $this->dataRic, PDO::PARAM_STR);
                        $stmt->bindParam(':data_ultima_com', $this->dataUltimaCom, PDO::PARAM_STR);
                        $stmt->bindParam(':fase', $this->fase, PDO::PARAM_INT);
                        $stmt->bindParam(':motivo', $this->motivo, PDO::PARAM_STR);
                        $stmt->bindParam(':note', $this->note, PDO::PARAM_STR);
                        $stmt->bindParam(':created_by', $this->createdBy, PDO::PARAM_INT);

                        $stmt->execute();

                        $this->setId($conn->lastInsertId());

                        if ($this->id != 0) {
                            $out->status = "OK";
                        } else {
                            $out->errorInfo=$conn->errorInfo();
			    $out->errorCode=$conn->errorCode();
                            throw new Exception("Errore d'inserimento");
                        }
                    } else {
                        throw new Exception("Codice fiscale o numero richiesta già presente.");
                    }
                } catch (Exception $ex) {
                    $out->error = $ex->getMessage();
                }
            } else {
                throw new Exception("DB-CONNECTION-ERROR");
            }
        } catch (Exception $ex) {
            $conn = null;
            $out->error = $ex->getMessage();
        }
        //file_put_contents("../log/dbtest.log",(new DateTime("now"))->format("Y-m-d H:i").$msg."\n",FILE_APPEND);
        return $out;
    }

    public function update()
    {
        $out = new stdClass();
        $out->status = "KO";
        // $out->fase = "pre-try";
        // file_put_contents("log/dbtest.log","[".(new DateTime("now"))->format("Y-m-d H:i")."] ".print_r($this)."\n",FILE_APPEND);
        try {
            if ($this->getId() != null) {
                // $out->fase = "post-try";
                if ("0000-00-00 00:00:00" == $this->dataRic){
                    $this->dataRic = null;
                }
                $conn = DB::conn();
                if ($conn != null) {
                    try {
                        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $query = "UPDATE `richieste` 
                            SET `nome`=:nome,
                            `cognome`=:cognome,
                            `codicefiscale`=:codiceFiscale,
                            `email`=:email,
                            `numero`=:numero,
                            `data_ric`=:data_ric,
                            `data_ultima_com`=:data_ultima_com,
                            `fase`=:fase,
                            `motivo`=:motivo,
                            `note`=:note,
                            `last_update`=:last_update,
                            `updated_by`=:updated_by,
                            `deleted_by`=:deleted_by,
                            `deleted_date`=:deleted_date,
                            `is_active`=:is_active
                            WHERE `id`=:id";

                        $stmt = $conn->prepare($query);

                        $stmt->bindParam(':nome', $this->nome, PDO::PARAM_STR);
                        $stmt->bindParam(':cognome', $this->cognome, PDO::PARAM_STR);
                        $stmt->bindParam(':codiceFiscale', $this->codiceFiscale, PDO::PARAM_STR);
                        $stmt->bindParam(':email', $this->email, PDO::PARAM_STR);
                        $stmt->bindParam(':numero', $this->numero, PDO::PARAM_STR);
                        $stmt->bindParam(':data_ric', $this->dataRic, PDO::PARAM_STR);
                        $stmt->bindParam(':data_ultima_com', $this->dataUltimaCom, PDO::PARAM_STR);
                        $stmt->bindParam(':fase', $this->fase, PDO::PARAM_INT);
                        $stmt->bindParam(':motivo', $this->motivo, PDO::PARAM_STR);
                        $stmt->bindParam(':note', $this->note, PDO::PARAM_STR);
                        $stmt->bindParam(':last_update', $this->lastUpdate, PDO::PARAM_STR);
                        $stmt->bindParam(':updated_by', $this->lastUpdateBy, PDO::PARAM_INT);
                        $stmt->bindParam(':deleted_by', $this->deletedBy, PDO::PARAM_INT);
                        $stmt->bindParam(':deleted_date', $this->deletedDate, PDO::PARAM_STR);
                        $stmt->bindParam(':is_active', $this->isActive, PDO::PARAM_INT);
                        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

                        $stmt->execute();
                        $out->num = $stmt->rowCount();

                        if ($out->num != 1) {
                            throw new Exception("UPDATE-ERROR");
                        }

                        $out->status = "OK";
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
        // file_put_contents("log/dbtest.log","[".(new DateTime("now"))->format("Y-m-d H:i")."] ".print_r($out)."\n",FILE_APPEND);
        return $out;
    }
}