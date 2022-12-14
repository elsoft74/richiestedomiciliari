<?php
    include_once("utils.php");
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
            return $conn;
        }

        public static function checkNewData($lastRead){
            $out=new StdClass();
            $out->status="KO";
            checkSession();
            if(isset($_SESSION["loggeduser"])){
                try {
                    $conn=DB::conn();
                    if ($lastRead==null){
                        throw new Exception("LASTREAD-NULL");
                    }
                    $dbname=DBNAME;
                    $query = "SELECT MAX(last_update_ts) > :lr AS updated
                        FROM   updates
                        WHERE  table_name IN
                        ('richieste','assistiti','tamponi')";
                        
                    $stmt = $conn->prepare($query);
                    $stmt->bindParam(':lr', $lastRead, PDO::PARAM_STR);
                    $stmt->execute();
                    $res=$stmt->fetch(PDO::FETCH_ASSOC); 
                    $out->data=($res["updated"]=="1");
                    $out->status="OK";
                    $out->dbg=json_encode($_SESSION);
                } catch(Exception $ex) {
                    $out->error=$ex->getMessage();
                }
            } else {
                $out->data="NOTLOGGED";
            }
            return $out;
        }
    }
?>
