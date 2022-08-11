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
        // $out->in=print_r($tmp,true);
        if ($tmp != null/* && $user != null*/) {
            $ric = new Richiesta();
            $ric->setId($tmp->id);
            $ric->getDetails();
            $ric->setDeletedBy($tmp->deletedBy);
            $ric->setDeletedDate((new DateTime())->format('Y-m-d H:i:s'));
            $ric->setIsActive(false);
            $out=$ric->update();
            $ric->getDetails();
            $out->debug=print_r($ric,true);
            //$out->status="OK";
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));


    /*

    ALTER TABLE `richieste` ADD `deleteBy` INT NOT NULL AFTER `is_active`, ADD `deleteDate` DATETIME NOT NULL AFTER `deleteBy`, ADD INDEX (`deleteBy`); 
    ALTER TABLE `richieste` CHANGE `deleteBy` `deleteBy` INT(11) NULL DEFAULT NULL; 
    ALTER TABLE `richieste` CHANGE `deleteBy` `deleted_by` INT(11) NULL DEFAULT NULL; 
    ALTER TABLE `richieste` CHANGE `deleted_date` `deleted_date` DATETIME NULL DEFAULT NULL; 
    */