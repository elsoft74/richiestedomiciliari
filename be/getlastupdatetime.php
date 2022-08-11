<?php
    include_once("config/config.php");
    include_once("classes/db.php");
    $out = new stdClass();
    $out->status = "KO";
    try {
        $out = DB::get_last_update_time($_POST["table"]);
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));