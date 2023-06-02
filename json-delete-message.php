<?php
    $type = $_POST['tipe'];
    $uuid = $_POST['uuid'];

    if($type == 'hapus_pesan') {
        $json = file_get_contents('json/message.json');
  
        // Decode the JSON file
        $json_data = json_decode($json, true);
        
        // Display data
        $data_count = count($json_data);
        for($i=0;$i<count($json_data); $i++) {
            if($json_data[$i]['uuid'] != $uuid && $data_count > 1) {
                $arr[] = (object)$json_data[$i];
                $generate = file_put_contents('json/message.json', json_encode($arr));
                echo 'not clear';
            }elseif($data_count == 1 && $json_data[$i]['uuid'] == $uuid) {
                file_put_contents('json/message.json', json_encode([]));
                echo 'clear';
            }
        }

    }