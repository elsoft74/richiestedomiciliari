<?php
    ini_set('display_startup_errors', 1);
    ini_set('display_errors', 1);
    error_reporting(-1);
    include_once("config/config.php");
    include_once("classes/db.php");
    include_once("classes/user.php");
    $username=(array_key_exists("username",$_POST))?$_POST["username"]:"";
    $token=(array_key_exists("token",$_POST))?$_POST["token"]:"";
    print(json_encode(User::getUsers($username,$token)));
