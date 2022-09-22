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

        public static function checkNewData($lastRead){
            $out=new StdClass();
            $out->status="KO";
            try {
                $conn=DB::conn();
                if ($lastRead==null){
                    throw new Exception("LASTREAD-NULL");
                }
                // $dbname=DBNAME;
                // $query = "SELECT MAX(UPDATE_TIME) > :lr AS updated
                //     FROM   information_schema.tables
                //     WHERE  TABLE_SCHEMA = :dbname
                //     AND (TABLE_NAME = 'richieste' OR TABLE_NAME = 'assistiti' OR TABLE_NAME = 'tamponi')";
                    
                // $stmt = $conn->prepare($query);
                // $stmt->bindParam(':lr', $lastRead, PDO::PARAM_STR);
                // $stmt->bindParam(':dbname', $dbname, PDO::PARAM_STR);
                // $stmt->execute();
                // $res=$stmt->fetch(PDO::FETCH_ASSOC); 
                // $out->data=($res["updated"]=="1");
                $out->data=true;
                $out->status="OK";
            } catch(Exception $ex) {
                $out->error=$ex->getMessage();
            }
            return $out;
        }
    }
?>
