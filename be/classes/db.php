<?php
    class DB {       
        public static function conn(){
            $msg="ERRORE DI CONNESSIONE";
            try {
                $dsn = 'mysql:host='.SERVER.';dbname='.DBNAME;
                $options = array(
                    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
                ); 
                $conn = new PDO($dsn, UNAME, PASSWORD, $options);
                $msg="CONNESSO";
            } catch(Exception $e){
                $conn=null;
            }
            //file_put_contents("../log/dbtest.log",(new DateTime("now"))->format("Y-m-d H:i").$msg."\n",FILE_APPEND);
            return $conn;
        }

        public static function get_last_update_time($table) {
            $out = new stdClass();
            $out->status="KO";
            $conn = DB::conn();
            if ($conn != null){
                try {
                    $query = "SELECT count(*) AS exist FROM `information_schema`.tables WHERE TABLE_SCHEMA = 'richieste' AND TABLE_NAME = '$table' ";
                    
                    $stmt = $conn->prepare($query);
                    $stmt->execute();
                    $res=$stmt->fetch(PDO::FETCH_ASSOC);
                    if(!$res['exist']){
                        throw new Exception("TABLE-NOT-EXIST");
                    }
                    $query = "SELECT UPDATE_TIME FROM `information_schema`.tables WHERE TABLE_SCHEMA = '".DBNAME."' AND TABLE_NAME = '$table' ";
                    $stmt = $conn->prepare($query);
                    $stmt->execute();
                    $res=$stmt->fetch(PDO::FETCH_ASSOC);
                    $out->data=$res["UPDATE_TIME"];
                    $out->status="OK";
                } catch(Exception $ex){
                        $out->error=$ex->getMessage();
                    }
                return $out;
            }
        }
    }
?>
