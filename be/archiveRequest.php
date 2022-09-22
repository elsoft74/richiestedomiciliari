<?php
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
            $ric->setArchivedBy($tmp->archivedBy);
            $ric->setArchivedDate((new DateTime())->format('Y-m-d H:i:s'));
            $out=$ric->archive($username,$token);
            $out->debug=print_r($ric,true);
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));