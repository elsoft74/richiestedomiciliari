<?php
    ini_set('display_startup_errors', 1);
    ini_set('display_errors', 1);
    error_reporting(-1);
    include_once("config/config.php");
    include_once("classes/db.php");
    include_once("classes/user.php");
    include_once("classes/tampone.php");
    include_once("classes/richiesta.php");
    $arc=(array_key_exists("arc",$_POST) && $_POST["arc"]=="true");
    $activeUsca = isset($_POST["activeUsca"])?$_POST["activeUsca"]:"ALL";
    $requests=Richiesta::getRequestes($arc,$activeUsca);
    $swabs=Tampone::getSwabs($activeUsca);
    $out=new StdClass();
    $out->status=($swabs->status==$requests->status)?$swabs->status:"KO";
    $out->requests=$requests->data;
    $out->swabs=$swabs->data;
    $out->lastRead=$requests->lastRead;

    
    print(json_encode($out));
