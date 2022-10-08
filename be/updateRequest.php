<?php
    // ini_set('display_startup_errors', 1);
    // ini_set('display_errors', 1);
    // error_reporting(-1);
    $out = new stdClass();
    $out->status = "KO";
    include_once("config/config.php");
    include_once("classes/db.php");
    include_once("classes/user.php");
    include_once("classes/richiesta.php");
    include_once("classes/assistito.php");
    $out->in=print_r($_SERVER,true);
    try {
        $tmp = json_decode($_POST['richiesta']);
        $username=$_POST['username'];
        $token=$_POST['token'];
        if ($tmp != null/* && $user != null*/) {
            $ric = new Richiesta();
            $ric->setId($tmp->id);
            $assistito = new Assistito();
            $assistito->setId($tmp->assistito->id);
            $assistito->setNome($tmp->assistito->nome);
            $assistito->setCognome($tmp->assistito->cognome);
            $assistito->setNascita($tmp->assistito->nascita);
            $assistito->setTelefono1($tmp->assistito->telefono1);
            $assistito->setTelefono2($tmp->assistito->telefono2);
            $assistito->setTelefono3($tmp->assistito->telefono3);
            $assistito->setEmail($tmp->assistito->email);
            $assistito->setCodiceFiscale($tmp->assistito->codiceFiscale);
            $assistito->setNote($tmp->assistito->note);
            $assistito->setIdUsca($tmp->assistito->idUsca);
            $assistito->update($username,$token);
            $ric->setIdAssistito($tmp->idAssistito);
            $ric->setIdTipologia(($tmp->idTipologia!="")?$tmp->idTipologia:null);
            $ric->setIdPriorita(($tmp->idPriorita!="")?$tmp->idPriorita:null);
            $ric->setData($tmp->data);
            $ric->setNote($tmp->note);
            $ric->setCreatedBy($tmp->createdBy);
            $ric->setNewStates($tmp->nuoviStati);
            
            if ($tmp->isArchived){
                $ric->setIsArchived($tmp->isArchived);
                $ric->setArchivedBy($tmp->archivedBy);
                $ric->setArchivedDate((new DateTime())->format("Y-m-d H:i:s"));
            }
            $ric->setLastUpdate((new DateTime())->format('Y-m-d H:i:s'));
            $ric->setLastUpdateBy($tmp->lastUpdateBy);

            $out=$ric->update($username,$token);
            $out->debug=print_r($ric,true);
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));
