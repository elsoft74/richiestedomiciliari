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
        $username=$_POST['username'];
        $token=$_POST['token'];
        if ($tmp != null/* && $user != null*/) {
            $ric = new Richiesta();
            $ric->setId($tmp->id);
            $ric->setIdTipologia($tmp->idTipologia);
            $ric->setIdPriorita($tmp->idPriorita);
            $ric->setData($tmp->data);
            $ric->setNote($tmp->note);
            $ric->setLastUpdate((new DateTime())->format('Y-m-d H:i:s'));
            $ric->setLastUpdateBy($tmp->lastUpdateBy);

            $out=$ric->update($username,$token);
            $out->debug=print_r($ric,true);
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));
