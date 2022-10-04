<?php
    require '../vendor/autoload.php';
    require_once("classes/assistito.php");
    require_once("classes/tampone.php");
    include_once("config/config.php");
    ini_set('memory_limit', '768M');

    use PhpOffice\PhpSpreadsheet\IOFactory;
    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    $out=new StdClass();
    $out->status="KO";
    $out->report=new StdClass();
    $out->report->righe=0;
    $out->report->inseriti=0;
    $out->report->presenti=0;
    $out->report->errori=0;
    $out->errors=[];
    try{
        $file=$_FILES['file']['tmp_name'];
        $status=array_key_exists("status",$_POST)?$_POST["status"]:null;
        $username=$_POST["username"];
        $token=$_POST["token"];
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReaderForFile($file);
        $reader->setReadDataOnly(false); // Dovrebbe permettere di interpreare sempre correttamente le date 
        $spreadsheet = $reader->load($file);
        $worksheet = $spreadsheet->getActiveSheet();//->toArray(null, true, true, true);
        $rows = [];
        unset($keys); // vanno rimosse ad ogni lettura per non far rileggere la prima riga
        foreach ($worksheet->getRowIterator() AS $row) {
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(FALSE); // This loops through all cells,
            $cells = [];
            foreach ($cellIterator as $cell) {
                $cells[] = $cell->getValue();
            }
            if (isset($keys)) {
                $rows[] = array_combine($keys, $cells);
            } else {
                $keys = $cells;
            }
        }
        $out->dbg=json_encode($worksheet);
        foreach($rows as $row){
            $assistito=new Assistito();
            $tampone=new Tampone();
            $assistito->setCognome($row["COGNOME"]);
            $assistito->setNome($row["NOME"]);
            $assistito->setCodiceFiscale($row["CODICE FISCALE"]);
            $assistito->setNascita(formattaData($row["DATA NASCITA"]));
            $assistito->setTelefono1(strval($row["TELEFONO1"]));
            $assistito->setTelefono2(strval($row["TELEFONO2"]));
            $assistito->setTelefono3(strval($row["ALTRO CONTATTO"]));
            $assistito->setIndirizzo($row["INDIRIZZO DOMICILIO"]." ".$row["DOMICILIO"]);
            $assistito->setEmail($row["MAIL"]);
            $tampone->setDataEsecuzione(formattaData($row["DATA TAMPONE"]));
            $tampone->setDataConsigliata(formattaData($row["GIORNO TAMPONE"]));
            $tampone->setIdStatus(($status!=null)?intval($status):null);
            $assistito->getIdOrInsert($username,$token);
            var_dump($assistito);
            $tampone->setIdAssistito($assistito->getId());
            var_dump($tampone);
            $ins=$tampone->insert($username,$token);
            var_dump($ins);
            if($ins->status=="OK"){
                if($ins->data==null){
                    $out->report->presenti++;
                } else  {
                    $out->report->inseriti++;
                }
            } else {
                $out->report->errori++;
                array_push($out->errors,$out->report->righe+1);
            }
            $out->report->righe++;
        }
        
        $out->status="OK";
    } catch(Exception $ex){
        $out->error=$ex->getMessage();
    }
    echo(json_encode($out));

    function formattaData($val){
        return substr($val,6)."-".substr($val,3,2)."-".substr($val,0,2);
    }
