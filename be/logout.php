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
            $user = new User();
            $out=$user->logout();
            $out->status="OK";
        } catch (Exception $ex) {
            $out->error = $ex->getMessage();
    }
    print(json_encode($out));