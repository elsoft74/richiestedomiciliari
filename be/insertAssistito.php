<?php
    // ini_set('display_startup_errors', 1);
    // ini_set('display_errors', 1);
    // error_reporting(-1);
    $out = new stdClass();
    $out->status = "KO";
    include_once("config/config.php");
    include_once("classes/db.php");
    include_once("classes/assistito.php"); 
    try {
        $tmp = json_decode($_POST['assistito']);
        $username = $_POST['username'];
        $token = $_POST['token'];
        $out->in=print_r($tmp,true);
        if ($tmp != null/* && $user != null*/) {
            $assistito = new Assistito();
            $assistito->setNome($tmp->nome);
            $assistito->setCognome($tmp->cognome);
            $assistito->setCodiceFiscale($tmp->codiceFiscale);
            $assistito->setTelefono($tmp->telefono);
            $assistito->setEmail($tmp->email);
            $assistito->setIndirizzo($tmp->indirizzo);
            $assistito->setNote($tmp->note);
            
            $out=$assistito->insert($username,$token);
            //$ric->getDetails();
            $out->debug=print_r($tmp,true);
            // $out->status="OK";
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));