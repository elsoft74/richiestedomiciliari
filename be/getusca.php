<?php
    // ini_set('display_startup_errors', 1);
    // ini_set('display_errors', 1);
    // error_reporting(-1);
    include_once("config/config.php");
    include_once("classes/db.php");
    include_once("classes/usca.php");
    print(json_encode(Usca::getUsca()));
