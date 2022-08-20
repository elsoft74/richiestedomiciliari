<?php
    class Usca {    
        
        public static function getUsca(){
            $out = new stdClass();
            $out->status="KO";
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {
                        $query="SELECT id,descrizione FROM `usca` WHERE `is_active`=1";
                        
                        $stmt = $conn->prepare($query);
                        $stmt->execute();
                        $res=$stmt->fetchAll(PDO::FETCH_ASSOC);
                        $out->data=$res;                    
                        $out->status="OK";
                    } catch(Exception $ex){
                            $out->error=$ex->getMessage();
                        }
                }
                else {
                    $out->error="DB-CONNECTION-ERROR";
                }
            } catch(Exception $e){
                $conn=null;
            }
            //file_put_contents("../log/dbtest.log",(new DateTime("now"))->format("Y-m-d H:i").$msg."\n",FILE_APPEND);
            return $out;
        }
    }