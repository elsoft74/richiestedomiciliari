<?php
    $out = new stdClass();
    $out->status = "KO";
    include_once("config/config.php");
    include_once("classes/db.php");
    include_once("classes/user.php");
    include_once("classes/tampone.php");
    $out->in=print_r($_SERVER,true);
    try {
        $tmp = json_decode($_POST['tampone']);
        $username=$_POST['username'];
        $token=$_POST['token'];
        if ($tmp != null/* && $user != null*/) {
            $tampone = new Tampone();
            $tampone->setId($tmp->id);
            $tampone->setLastUpdate((new DateTime())->format('Y-m-d H:i:s'));
            $tampone->setLastUpdateBy($tmp->lastUpdateBy);
            $tampone->setStatus($tmp->status);
            $out=$tampone->update($username,$token);
            $out->debug=print_r($tampone,true);
        }
    } catch (Exception $ex) {
        $out->error = $ex->getMessage();
    }
    print(json_encode($out));
