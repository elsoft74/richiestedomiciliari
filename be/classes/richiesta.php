<?php
include_once("user.php");
include_once("db.php");
include_once("utils.php");
class Richiesta
{
    public $id;
    public $idAssistito;
    public $idTipologia;
    public $idPriorita;
    public $data;
    public $note;
    public $isactive;
    public $created;
    public $createdBy;
    public $lastUpdate;
    public $lastUpdateBy;
    public $deletedDate;
    public $deletedBy;
    public $isArchived;
    public $archivedDate;
    public $archivedBy;
    public $contatti;
    public $newStates;

    public function setId($val)
    {
        $this->id = $val;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setIdAssistito($val)
    {
        $this->idAssistito = $val;
    }

    public function getIdAssistito()
    {
        return $this->idAssistito;
    }

    public function setIdTipologia($val)
    {
        $this->idTipologia = $val;
    }

    public function getIdTipologia()
    {
        return $this->idTipologia;
    }

    public function setIdPriorita($val)
    {
        $this->idPriorita = $val;
    }

    public function getIdPriorita()
    {
        return $this->idPriorita;
    }

    public function setData($val)
    {
        $this->data = $val;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setNote($val)
    {
        $this->note = $val;
    }

    public function getNote()
    {
        return $this->note;
    }

    public function setIsActive($val)
    {
        $this->isActive = $val;
    }

    public function getIsActive()
    {
        return $this->isActive;
    }

    public function setCreated($val)
    {
        $this->created = $val;
    }

    public function getCreated()
    {
        return $this->created;
    }

    public function setCreatedBy($val)
    {
        $this->createdBy = $val;
    }

    public function getCreatedBy()
    {
        return $this->createdBy;
    }

    public function setLastUpdate($val)
    {
        $this->lastUpdate = $val;
    }

    public function getLastUpdate()
    {
        return $this->lastUpdate;
    }

    public function setLastUpdateBy($val)
    {
        $this->lastUpdateBy = $val;
    }

    public function getLastUpdateBy()
    {
        return $this->lastUpdateBy;
    }

    public function setDeletedDate($val)
    {
        $this->deletedDate = $val;
    }

    public function getDeletedDate()
    {
        return $this->deletedDate;
    }

    public function setDeletedBy($val)
    {
        $this->deletedBy = $val;
    }

    public function getDeletedBy()
    {
        return $this->deletedBy;
    }

    public function setIsArchived($val)
    {
        $this->isArchived = $val;
    }

    public function getIsArchived()
    {
        return $this->isArchived;
    }

    public function setArchivedBy($val)
    {
        $this->archivedBy = $val;
    }

    public function getArchivedBy()
    {
        return $this->archivedBy;
    }

    public function setArchivedDate($val)
    {
        $this->archivedDate = $val;
    }

    public function getArchivedDate()
    {
        return $this->archivedDate;
    }

    public function setContatti($val)
    {
        $this->contatti = $val;
    }

    public function getContatti()
    {
        return $this->contatti;
    }

    public function setNewStates($val)
    {
        $this->newStates = $val;
    }

    public function getNewStates()
    {
        return $this->newStates;
    }

    function __construct()
    {
        $this->id = null;
        $this->idAssistito = null;
        $this->idTipologia = null;
        $this->idPriorita = null;
        $this->data = null;
        $this->note = null;
        $this->isactive = null;
        $this->created = null;
        $this->createdBy = null;
        $this->lastUpdate = null;
        $this->lastUpdateBy = null;
        $this->deletedDate = null;
        $this->deletedBy = null;
        $this->archivedDate = null;
        $this->archivedBy = null;
        $this->contatti = null;
        $this->newStates = null;
        $this->isArchived = false;
    }


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

    public static function getRequestes($arc, $activeUsca)
    {
        //$val null o "A" restituisce tutte le richieste Attive
        //$val "T" restituisce tutte le richieste
        //$vak "C" restitiosce le richieste inattive (Cancellate)

        $out = new stdClass();
        $out->status = "KO";
        $out->data = [];
        try {
            checkAndExtendSession();
            if (isset($_SESSION["loggeduser"])) {
                $user = json_decode($_SESSION["loggeduser"]);
                $user = recast("User", $user);
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
                        TIMESTAMPDIFF(YEAR,nascita,now()) as eta,
                        a.id_usca AS id_usca,
                        r.id as id_richiesta,
                        r.id_tipologia AS id_tipologia,
                        r.id_priorita AS id_priorita,
                        r.data AS data,
                        r.note AS note_richiesta,
                        r.is_active AS richiesta_is_active,
                        r.created AS created,
                        r.created_by AS created_by,
                        r.last_update AS last_update,
                        r.last_update_by AS last_update_by,
                        r.is_archived AS is_archived,
                        u.descrizione AS usca,
                        t.descrizione AS tipologia,
                        p.descrizione AS priorita
                        FROM `assistiti` AS a JOIN `richieste` AS r ON a.id=r.id_assistito
                        LEFT JOIN `usca` AS u ON a.id_usca=u.id
                        LEFT JOIN `tipologie` AS t ON r.id_tipologia=t.id
                        LEFT JOIN `priorita` AS p ON r.id_priorita=p.id
                        WHERE a.is_active=1";
                        */

                        $query = "SELECT * FROM `vista_richieste` WHERE (richiesta_is_active=1 OR richiesta_is_active IS null)";
                        if (!$arc) {
                            $query .= " AND (data >= CURRENT_DATE()-5 OR data is null)";
                            $query .= " AND (is_archived = 0 OR is_archived is null)";
                        }
                        if ($activeUsca != "ALL") {
                            $query .= " AND id_usca=:id_usca";
                        }

                        $query .= " ORDER BY data ASC";

                        $stmt = $conn->prepare($query);
                        if ($activeUsca != "ALL") {
                            $stmt->bindParam(':id_usca', $activeUsca, PDO::PARAM_INT);
                        }
                        $stmt->execute();

                        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        foreach ($res as $r) {
                            $tmp = new StdClass();
                            $tmp->id = intval($r['id_richiesta']);
                            $tmp->idAssistito = $r['id_assistito'];
                            $tmp->nome = $r['nome'];
                            $tmp->cognome = $r['cognome'];
                            $tmp->email = $r['email'];
                            $tmp->telefono1 = $r['telefono1'];
                            $tmp->telefono2 = $r['telefono2'];
                            $tmp->telefono3 = $r['telefono3'];
                            $tmp->indirizzo = $r['indirizzo'];
                            $tmp->codiceFiscale = $r['codicefiscale'];
                            $tmp->noteAssistito = $r['note_assistito'];
                            $tmp->nascita = $r['nascita'];
                            $tmp->eta = $r['eta'];
                            $tmp->assistitoIsActive = $r['assistito_is_active'];
                            $tmp->idRichiesta = $r['id_richiesta'];
                            $tmp->idTipologia = $r['id_tipologia'];
                            $tmp->idPriorita = $r['id_priorita'];
                            $tmp->idUsca = $r['id_usca'];
                            $tmp->data = $r['data'];
                            $tmp->noteRichiesta = $r['note_richiesta'];
                            $tmp->richiestaIsActive = $r['richiesta_is_active'];
                            $tmp->created = $r['created'];
                            $tmp->createdByNomeCognome = $r['created_by'];
                            $tmp->last_update = $r['last_update'];
                            $tmp->lastUpdateByNomeCognome = $r['last_update_by'];
                            $tmp->usca = $r['usca'];
                            $tmp->priorita = $r['priorita'];
                            $tmp->tipologia = $r['tipologia'];
                            $tmp->isArchived = ($r['is_archived'] == "1");
                            $tmp->archived = ($r['is_archived'] == "1") ? "S" : "N";
                            $contatti = [];
                            if ($r['telefono1'] != "") {
                                array_push($contatti, $r['telefono1']);
                            }
                            if ($r['telefono2'] != "") {
                                array_push($contatti, $r['telefono2']);
                            }
                            if ($r['telefono3'] != "") {
                                array_push($contatti, $r['telefono3']);
                            }
                            if ($r['email'] != "") {
                                array_push($contatti, $r['email']);
                            }
                            $tmp->contatti = json_encode($contatti);

                            $statiAttuali = [];
                            $query = "SELECT a.created AS date, s.descrizione FROM `attivita_svolte` AS a JOIN `stati_attivita` AS s ON a.id_stato=s.id WHERE id_attivita = :id_attivita ORDER BY created";
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':id_attivita', $tmp->id, PDO::PARAM_INT);
                            $stmt->execute();
                            $resStati = $stmt->fetchAll(PDO::FETCH_ASSOC);

                            foreach ($resStati as $rs) {
                                $stato = new StdClass();
                                $stato->date = $rs['date'];
                                $stato->descrizione = $rs['descrizione'];
                                array_push($statiAttuali, $stato);
                            }
                            $tmp->statiAttuali = json_encode($statiAttuali);

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
            } else {
                $out->data = "NOTLOGGED";
            }
        } catch (Exception $e) {
            $conn = null;
        }
        return $out;
    }

    public function insert()
    {
        $out = new stdClass();
        $out->status = "KO";
        try {
            checkAndExtendSession();
            if (isset($_SESSION["loggeduser"])) {
                $user = json_decode($_SESSION["loggeduser"]);
                $user = recast("User", $user);
                $conn = DB::conn();
                if ($conn != null) {
                    try {
                        $query = "SELECT is_active, role_id, id_usca FROM `users` AS u WHERE u.username=:username";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':username', $user->username, PDO::PARAM_STR);
                        $stmt->execute();
                        $res = $stmt->fetch(PDO::FETCH_ASSOC);
                        if ($res && $res['is_active'] == 1) {
                            // $this->idUsca=$res['id_usca'];
                            $query = "INSERT INTO `richieste` (
                                    `id_assistito`,
                                    `id_tipologia`,
                                    `id_priorita`,
                                    `is_archived`,
                                    `data`,
                                    `note`,
                                    `created_by`
                                ) VALUES (:id_assistito,
                                    :id_tipologia,
                                    :id_priorita,
                                    :is_archived,
                                    :data,
                                    :note,
                                    :created_by)";

                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':id_assistito', $this->idAssistito, PDO::PARAM_INT);
                            $stmt->bindParam(':id_tipologia', $this->idTipologia, PDO::PARAM_INT);
                            $stmt->bindParam(':id_priorita', $this->idPriorita, PDO::PARAM_INT);
                            $stmt->bindParam(':is_archived', $this->isArchived, PDO::PARAM_INT);
                            $stmt->bindParam(':data', $this->data, PDO::PARAM_STR);
                            $stmt->bindParam(':note', $this->note, PDO::PARAM_STR);
                            $stmt->bindParam(':created_by', $this->createdBy, PDO::PARAM_INT);

                            $stmt->execute();

                            $this->setId($conn->lastInsertId());

                            $insStati = true;

                            foreach ($this->getNewStates() as $stato) {
                                $query = "INSERT INTO `attivita_svolte` (
                                        `id_attivita`,
                                        `id_stato`,
                                        `created_by`
                                    ) VALUES (:id_attivita,
                                        :id_stato,
                                        :created_by)";

                                $stmt = $conn->prepare($query);
                                $stmt->bindParam(':id_attivita', $this->id, PDO::PARAM_INT);
                                $stmt->bindParam(':id_stato', $stato, PDO::PARAM_INT);
                                $stmt->bindParam(':created_by', $this->createdBy, PDO::PARAM_INT);
                                $stmt->execute();

                                if ($conn->lastInsertId() == 0) {
                                    $insStati = $insStati && false;
                                }
                            }

                            if ($this->id != 0 && $insStati) {
                                $query = "UPDATE `updates` SET last_update_ts=LOCALTIMESTAMP() WHERE table_name='richieste'";
                                $stmt = $conn->prepare($query);
                                $stmt->execute();
                                if ($stmt->rowCount() == 1) {
                                    $out->status = "OK";
                                }
                            } else {
                                $out->errorInfo = $conn->errorInfo();
                                $out->errorCode = $conn->errorCode();
                                if ($this->id == 0) {
                                    throw new Exception("Errore d'inserimento");
                                } else {
                                    throw new Exception("Errore durante l'inserimento degli stati");
                                }
                            }
                        } else {
                            throw new Exception("OPERAZIONE-NON-PERMESSA");
                        }
                    } catch (Exception $ex) {
                        $out->error = $ex->getMessage();
                    }
                } else {
                    throw new Exception("DB-CONNECTION-ERROR");
                }
            } else {
                $out->data = "NOTLOGGED";
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
        try {
            checkAndExtendSession();
            if (isset($_SESSION["loggeduser"])) {
                $user = json_decode($_SESSION["loggeduser"]);
                $user = recast("User", $user);
                if ($this->getId() != null) {

                    $conn = DB::conn();
                    if ($conn != null) {
                        try {
                            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $query = "SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':username', $user->username, PDO::PARAM_STR);
                            $stmt->execute();
                            $res = $stmt->fetch(PDO::FETCH_ASSOC);
                            if ($res && $res['is_active'] == 1) {
                                $query = "UPDATE `richieste` SET
                                id_tipologia=:id_tipologia,
                                id_priorita=:id_priorita,
                                data=:data,
                                last_update=:last_update,
                                last_update_by=:last_update_by,
                                note=:note
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

                                $insStati = true;

                                foreach ($this->getNewStates() as $stato) {
                                    $query = "INSERT INTO `attivita_svolte` (
                                    `id_attivita`,
                                    `id_stato`,
                                    `created_by`
                                ) VALUES (:id_attivita,
                                    :id_stato,
                                    :created_by)";

                                    $stmt = $conn->prepare($query);
                                    $stmt->bindParam(':id_attivita', $this->id, PDO::PARAM_INT);
                                    $stmt->bindParam(':id_stato', $stato, PDO::PARAM_INT);
                                    $stmt->bindParam(':created_by', $this->lastUpdateBy, PDO::PARAM_INT);
                                    $stmt->execute();

                                    if ($conn->lastInsertId() == 0) {
                                        $insStati = $insStati && false;
                                    }
                                }

                                if ($insStati) {
                                    $query = "UPDATE `updates` SET last_update_ts=LOCALTIMESTAMP() WHERE table_name='richieste'";
                                    $stmt = $conn->prepare($query);
                                    $stmt->execute();
                                    if ($stmt->rowCount() == 1) {
                                        $out->status = "OK";
                                    }
                                }
                            } else {
                                throw new Exception("OPERAZIONE-NON-PERMESSA");
                            }
                        } catch (Exception $ex) {
                            $out->status = "KO";
                            $out->error = $ex->getMessage();
                        }
                    } else {
                        throw new Exception("DB-CONNECTION-ERROR");
                    }
                } else {
                    throw new Exception("EMPTY-REQUEST");
                }
            } else {
                $out->data = "NOTLOGGED";
            }
        } catch (Exception $ex) {
            $conn = null;
            $out->status = "KO";
            $out->error = $ex->getMessage();
        }
        return $out;
    }

    public function delete()
    {
        $out = new stdClass();
        $out->status = "KO";
        try {
            checkAndExtendSession();
            if (isset($_SESSION["loggeduser"])) {
                $user = json_decode($_SESSION["loggeduser"]);
                $user = recast("User", $user);
                if ($this->getId() != null) {

                    $conn = DB::conn();
                    if ($conn != null) {
                        try {
                            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $query = "SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':username', $user->username, PDO::PARAM_STR);
                            $stmt->execute();
                            $res = $stmt->fetch(PDO::FETCH_ASSOC);
                            if ($res && $res['is_active'] == 1) {
                                $query = "UPDATE `richieste` SET
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

                                $query = "UPDATE `updates` SET last_update_ts=LOCALTIMESTAMP() WHERE table_name='richieste'";
                                $stmt = $conn->prepare($query);
                                $stmt->execute();
                                if ($stmt->rowCount() == 1) {
                                    $out->status = "OK";
                                }
                            } else {
                                throw new Exception("OPERAZIONE-NON-PERMESSA");
                            }
                        } catch (Exception $ex) {
                            $out->status = "KO";
                            $out->error = $ex->getMessage();
                        }
                    } else {
                        throw new Exception("DB-CONNECTION-ERROR");
                    }
                } else {
                    throw new Exception("EMPTY-REQUEST");
                }
            } else {
                $out->data = "NOTLOGGED";
            }
        } catch (Exception $ex) {
            $conn = null;
            $out->status = "KO";
            $out->error = $ex->getMessage();
        }
        return $out;
    }

    public function archive()
    {
        $out = new stdClass();
        $out->status = "KO";
        try {
            checkAndExtendSession();
            if (isset($_SESSION["loggeduser"])) {
                $user = json_decode($_SESSION["loggeduser"]);
                $user = recast("User", $user);
                if ($this->getId() != null) {

                    $conn = DB::conn();
                    if ($conn != null) {
                        try {
                            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $query = "SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':username', $user->username, PDO::PARAM_STR);
                            $stmt->execute();
                            $res = $stmt->fetch(PDO::FETCH_ASSOC);
                            if ($res && $res['is_active'] == 1) {
                                $query = "UPDATE `richieste` SET
                                is_archived=1,
                                archived_date=:archived_date,
                                archived_by=:archived_by
                                WHERE `id`=:id";

                                $stmt = $conn->prepare($query);

                                $stmt->bindParam(':archived_date', $this->archivedDate, PDO::PARAM_STR);
                                $stmt->bindParam(':archived_by', $this->archivedBy, PDO::PARAM_INT);
                                $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

                                $stmt->execute();
                                $out->num = $stmt->rowCount();

                                if ($out->num != 1) {
                                    throw new Exception("UPDATE-ERROR");
                                }

                                $query = "UPDATE `updates` SET last_update_ts=LOCALTIMESTAMP() WHERE table_name='richieste'";
                                $stmt = $conn->prepare($query);
                                $stmt->execute();
                                if ($stmt->rowCount() == 1) {
                                    $out->status = "OK";
                                }
                            } else {
                                throw new Exception("OPERAZIONE-NON-PERMESSA");
                            }
                        } catch (Exception $ex) {
                            $out->status = "KO";
                            $out->error = $ex->getMessage();
                        }
                    } else {
                        throw new Exception("DB-CONNECTION-ERROR");
                    }
                } else {
                    throw new Exception("EMPTY-REQUEST");
                }
            } else {
                $out->data = "NOTLOGGED";
            }
        } catch (Exception $ex) {
            $conn = null;
            $out->status = "KO";
            $out->error = $ex->getMessage();
        }
        return $out;
    }

    public function unArchive()
    {
        $out = new stdClass();
        $out->status = "KO";
        try {
            checkAndExtendSession();
            if (isset($_SESSION["loggeduser"])) {
                $user = json_decode($_SESSION["loggeduser"]);
                $user = recast("User", $user);
                if ($this->getId() != null) {

                    $conn = DB::conn();
                    if ($conn != null) {
                        try {
                            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $query = "SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':username', $user->username, PDO::PARAM_STR);
                            $stmt->execute();
                            $res = $stmt->fetch(PDO::FETCH_ASSOC);
                            if ($res && $res['is_active'] == 1) {
                                $query = "UPDATE `richieste` SET
                                is_archived=0,
                                archived_date=:archived_date,
                                archived_by=:archived_by
                                WHERE `id`=:id";

                                $stmt = $conn->prepare($query);

                                $stmt->bindParam(':archived_date', $this->archivedDate, PDO::PARAM_STR);
                                $stmt->bindParam(':archived_by', $this->archivedBy, PDO::PARAM_INT);
                                $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

                                $stmt->execute();
                                $out->num = $stmt->rowCount();

                                if ($out->num != 1) {
                                    throw new Exception("UPDATE-ERROR");
                                }

                                $query = "UPDATE `updates` SET last_update_ts=LOCALTIMESTAMP() WHERE table_name='richieste'";
                                $stmt = $conn->prepare($query);
                                $stmt->execute();
                                if ($stmt->rowCount() == 1) {
                                    $out->status = "OK";
                                }
                            } else {
                                throw new Exception("OPERAZIONE-NON-PERMESSA");
                            }
                        } catch (Exception $ex) {
                            $out->status = "KO";
                            $out->error = $ex->getMessage();
                        }
                    } else {
                        throw new Exception("DB-CONNECTION-ERROR");
                    }
                } else {
                    throw new Exception("EMPTY-REQUEST");
                }
            } else {
                $out->data = "NOTLOGGED";
            }
        } catch (Exception $ex) {
            $conn = null;
            $out->status = "KO";
            $out->error = $ex->getMessage();
        }
        return $out;
    }

    public function updateNote()
    {
        $out = new stdClass();
        $out->status = "KO";
        try {
            checkAndExtendSession();
            if (isset($_SESSION["loggeduser"])) {
                $user = json_decode($_SESSION["loggeduser"]);
                $user = recast("User", $user);
                if ($this->getId() != null) {

                    $conn = DB::conn();
                    if ($conn != null) {
                        try {
                            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $query = "SELECT is_active, role_id FROM `users` AS u WHERE u.username=:username";
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
                            $stmt->execute();
                            $res = $stmt->fetch(PDO::FETCH_ASSOC);
                            if ($res && $res['is_active'] == 1) {
                                $query = "UPDATE `richieste` SET
                                note=:note,
                                last_update=:last_update,
                                last_update_by=:last_update_by
                                WHERE `id`=:id";

                                $stmt = $conn->prepare($query);
                                $note = json_encode($this->note);
                                $stmt->bindParam(':note', $note, PDO::PARAM_STR);
                                $stmt->bindParam(':last_update', $this->lastUpdate, PDO::PARAM_STR);
                                $stmt->bindParam(':last_update_by', $this->lastUpdateBy, PDO::PARAM_INT);
                                $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

                                $stmt->execute();
                                $out->num = $stmt->rowCount();

                                if ($out->num != 1) {
                                    throw new Exception("UPDATE-ERROR");
                                }

                                $query = "UPDATE `updates` SET last_update_ts=LOCALTIMESTAMP() WHERE table_name='richieste'";
                                $stmt = $conn->prepare($query);
                                $stmt->execute();
                                if ($stmt->rowCount() == 1) {
                                    $out->status = "OK";
                                }
                            } else {
                                throw new Exception("OPERAZIONE-NON-PERMESSA");
                            }
                        } catch (Exception $ex) {
                            $out->status = "KO";
                            $out->error = $ex->getMessage();
                        }
                    } else {
                        throw new Exception("DB-CONNECTION-ERROR");
                    }
                } else {
                    throw new Exception("EMPTY-REQUEST");
                }
            } else {
                $out->data = "NOTLOGGED";
            }
        } catch (Exception $ex) {
            $conn = null;
            $out->status = "KO";
            $out->error = $ex->getMessage();
        }
        return $out;
    }

    public static function getStatiAttivita()
    {
        $out = new stdClass();
        $out->status = "KO";
        try {
            checkAndExtendSession();
            if (isset($_SESSION["loggeduser"])) {
                $conn = DB::conn();
                if ($conn != null) {
                    try {
                        $query = "SELECT id,descrizione FROM `stati_attivita` WHERE `is_active`=1 ORDER BY descrizione";

                        $stmt = $conn->prepare($query);
                        $stmt->execute();
                        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        $out->data = $res;
                        $out->status = "OK";
                    } catch (Exception $ex) {
                        $out->error = $ex->getMessage();
                    }
                } else {
                    $out->error = "DB-CONNECTION-ERROR";
                }
            } else {
                $out->data = "NOTLOGGED";
            }
        } catch (Exception $e) {
            $conn = null;
        }
        return $out;
    }
}
