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
        $username = isset($_POST['username'])?$_POST['username']:null;
        $password = isset($_POST['password'])?$_POST['password']:null;
        // $out->in=print_r($_POST,true);
        if ($username != null && $password != null) {
            $user = new User();
            $user->setUserName($username);
            $user->setPassword($password);
            

            $out=$user->login();
            //$out->debug=print_r($user,true);
            // $out->status="OK";
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));