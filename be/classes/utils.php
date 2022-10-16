<?php
    include_once("config/config.php");
    function checkAndExtendSession(){
        session_start();
        $t=time();
        if (isset($_SESSION['LAST_ACTIVITY']) && ($t - $_SESSION['LAST_ACTIVITY'] > DURATION)) {
            session_unset();     // unset $_SESSION variable for the run-time 
            session_destroy();   // destroy session data in storage
        } else {
            $_SESSION['LAST_ACTIVITY'] = $t;
            if (!isset($_SESSION['CREATED'])) {
                $_SESSION['CREATED'] = $t;
            } else if ($t - $_SESSION['CREATED'] > DURATION) {
                session_regenerate_id(true);    // change session ID for the current session and invalidate old session ID
                $_SESSION['CREATED'] = $t;  // update creation time
            }
        }
        
    }

    function checkSession(){
        session_start();
        $t=time();
        if (isset($_SESSION['LAST_ACTIVITY']) && ($t - $_SESSION['LAST_ACTIVITY'] > DURATION)) {
            session_unset();     // unset $_SESSION variable for the run-time 
            session_destroy();   // destroy session data in storage
        }
    }

    function createSession(){
        session_start();
        $t=time();
        if (!isset($_SESSION['LAST_ACTIVITY'])) {
            $_SESSION['LAST_ACTIVITY'] = $t;
        }
        if (!isset($_SESSION['CREATED'])) {
            $_SESSION['CREATED'] = $t;
        }
    }
?>