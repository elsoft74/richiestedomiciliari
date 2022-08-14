<?php
    ini_set('display_startup_errors', 1);
    ini_set('display_errors', 1);
    error_reporting(-1);
    $out = new stdClass();
    $out->status = "KO";
    include_once("config/config.php");
    // include_once("classes/user.php");
    include_once("classes/richiesta.php"); 
    try {
        $tmp = json_decode($_POST['richiesta']);
        $username = $_POST['username'];
        $token = $_POST['token'];
        $out->in=print_r($tmp,true);
        if ($tmp != null/* && $user != null*/) {
            $ric = new Richiesta();
            
            $ric->setIdAssistito($tmp->idAssistito);
            $ric->setIdTipologia($tmp->idTipologia);
            $ric->setIdPriorita($tmp->idPriorita);
            $ric->setData($tmp->data);
            $ric->setNote($tmp->note);
            $ric->setCreatedBy($tmp->createdBy);
            $tmp=$ric;

            $out=$ric->insert($username,$token);
            $out->debug=print_r($tmp,true);
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));
