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
    $out->in=print_r($_SERVER,true);
    try {
        $tmp = json_decode($_POST['richiesta']);
        // $out->in=print_r($tmp,true);
        if ($tmp != null/* && $user != null*/) {
            $ric = new Richiesta();
            $ric->setId($tmp->id);
            $ric->getDetails();
            $ric->setNome($tmp->nome);
            $ric->setCognome($tmp->cognome);
            $ric->setCodiceFiscale($tmp->codiceFiscale);
            $ric->setEmail($tmp->email);
            $ric->setDataRic($tmp->dataRic);
            $ric->setDataUltimaComunicazione(($tmp->dataUltimaCom=="")?null:$tmp->dataUltimaCom);
            $ric->setNumero($tmp->numero);
            $ric->setFase($tmp->fase);
            $ric->setMotivo($tmp->motivo);
            $ric->setNote($tmp->note);
            $ric->setLastUpdate((new DateTime())->format('Y-m-d H:i:s'));
            $ric->setLastUpdateBy($tmp->lastUpdateBy);

            $out=$ric->update();
            $ric->getDetails();
            $out->debug=print_r($ric,true);
            //$out->status="OK";
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));
