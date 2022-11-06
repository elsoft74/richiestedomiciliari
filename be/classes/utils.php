<?php
    include_once("config/config.php");
    function checkAndExtendSession(){
        $status = session_status();
        if($status == PHP_SESSION_NONE){
            //There is no active session
            session_start();
        }
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
        $status = session_status();
        if($status == PHP_SESSION_NONE){
            //There is no active session
            session_start();
        }
        $t=time();
        if (isset($_SESSION['LAST_ACTIVITY']) && ($t - $_SESSION['LAST_ACTIVITY'] > DURATION)) {
            session_unset();     // unset $_SESSION variable for the run-time 
            session_destroy();   // destroy session data in storage
        }
    }

    function createSession(){
        $status = session_status();
        if($status == PHP_SESSION_NONE){
            //There is no active session
            session_start();
        }
        $t=time();
        if (!isset($_SESSION['LAST_ACTIVITY'])) {
            $_SESSION['LAST_ACTIVITY'] = $t;
        }
        if (!isset($_SESSION['CREATED'])) {
            $_SESSION['CREATED'] = $t;
        }
    }

    /**
     * recast stdClass object to an object with type
     *
     * @param string $className
     * @param stdClass $object
     * @throws InvalidArgumentException
     * @return mixed new, typed object
     */
    function recast($className, stdClass &$object) {
        if (!class_exists($className))
            throw new InvalidArgumentException(sprintf('Inexistant class %s.', $className));

        $new = new $className();

        foreach($object as $property => &$value)
        {
            $new->$property = &$value;
            unset($object->$property);
        }
        unset($value);
        $object = (unset) $object;
        return $new;
    }
?>