<?php
    include_once("utils.php");
    class Log {    
        
        public static function insert($tipo,$idAssistito,$idStato,$idRichiesta,$idTampone){
            $out = new stdClass();
            $out->status="KO";
            try {
                $conn=DB::conn();
                if ($conn!=null){
                    try {
                        if(session_id()==''){
                            checkSession();
                        }
                        $user = json_decode($_SESSION["loggeduser"]);
                        if($user!=null){
                            $query="INSERT INTO log (id_user,tipo,id_assistito,id_stato,id_richiesta,id_tampone) VALUES (:id_user,:tipo,:id_assistito,:id_stato,:id_richiesta,:id_tampone)";
                            
                            $stmt = $conn->prepare($query);
                            $stmt->bindParam(':id_user',$user->id,PDO::PARAM_INT);
                            $stmt->bindParam(':tipo',$tipo,PDO::PARAM_STR);
                            $stmt->bindParam(':id_assistito',$idAssistito,PDO::PARAM_INT);
                            $stmt->bindParam(':id_stato',$idStato,PDO::PARAM_INT);
                            $stmt->bindParam(':id_richiesta',$idRichiesta,PDO::PARAM_INT);
                            $stmt->bindParam(':id_tampone',$idTampone,PDO::PARAM_INT);
                            $stmt->execute();
                            $res=$stmt->fetchAll(PDO::FETCH_ASSOC);
                            $out->data=$conn->lastInsertId();                    
                            if($out->data > 0){
                                $out->status="OK";
                            }
                        }
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
            //file_put_contents("../log/dbtest.log",:(new DateTime("now"))->format("Y-m-d H:i").$msg."\n",FILE_APPEND);
            return $out;
        }
    }
