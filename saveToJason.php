<?php

    if($_SERVER["REQUEST_METHOD"] == 'POST'){
        $input = file_get_contents('php://input');

        $name ="sbGrid.json";
        $fp = fopen($name,"w");

        fwrite($fp,$input);
        $isSave=true;
        flock($fp,LOCK_UN);

        fclose($fp);
    }

    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $filePath = "sbGrid.json";
        if(file_exists($filePath)){
            $myfile = fopen($filePath, 'r');
            echo fread($myfile, filesize($filePath));
            fclose($myfile);
        }
        else{
            $myfile = fopen($filePath, 'w');
            fclose($fp); 
        }
    }

?>