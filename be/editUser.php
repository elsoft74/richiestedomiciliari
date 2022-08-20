<?php
    // ini_set('display_startup_errors', 1);
    // ini_set('display_errors', 1);
    // error_reporting(-1);
    $out = new stdClass();
    $out->status = "KO";
    include_once("config/config.php");
    include_once("classes/db.php");
    include_once("classes/user.php"); 
    try {
        $tmp = json_decode($_POST['user']);
        $username = $_POST['username'];
        $token = $_POST['token'];
        $out->in=print_r($tmp,true);
        if ($tmp != null/* && $user != null*/) {
            $user = new User();
            $user->setId($tmp->id);
            $user->setNome($tmp->nome);
            $user->setCognome($tmp->cognome);
            $user->setEmail($tmp->email);
            if($tmp->password!=""){
                $user->setPassword($tmp->password);
            }
            $user->setRoleId($tmp->roleId);
            $user->setUsername($tmp->username);
            $user->setIsActive($tmp->isActive);
            $user->setIdUsca($tmp->idUsca);
            
            $out=$user->update($username,$token);
            //$ric->getDetails();
            $out->debug=print_r($tmp,true);
            // $out->status="OK";
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));