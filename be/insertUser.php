<?php
    // ini_set('display_startup_errors', 1);
    // ini_set('display_errors', 1);
    // error_reporting(-1);
    $out = new stdClass();
    $out->status = "KO";
    include_once("config/config.php");
    include_once("classes/db.php");
    include_once("classes/user.php");
    include_once("classes/user.php"); 
    try {
        $tmp = json_decode($_POST['user']);
        $username = $_POST['username'];
        $token = $_POST['token'];
        $out->in=print_r($tmp,true);
        if ($tmp != null/* && $user != null*/) {
            $newUser = new User();
            $newUser->setNome($tmp->nome);
            $newUser->setCognome($tmp->cognome);
            $newUser->setEmail($tmp->email);
            $newUser->setPassword($tmp->password);
            $newUser->setRoleId($tmp->roleId);
            $newUser->setUsername($tmp->username);
            $newUser->setIdUsca($tmp->idUsca);
            $out=$newUser->insert($username,$token);
            //$ric->getDetails();
            $out->debug=print_r($tmp,true);
            // $out->status="OK";
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));