<?php
    // set timezone
    date_default_timezone_set('Asia/Jakarta');
    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    // mendapatkan data dari form
    $uuid = generateRandomString(36);
    $name = $_POST['nama'];
    $present = $_POST['kehadiran'];
    $message = $_POST['ucapan'];

    // conversi data menjadi array
    $obj = [
        'uuid' => $uuid,
        'nama' => $name,
        'kehadiran' => $present,
        'ucapan' => $message,
        'date' => date('Y-m-d'),
        'time' => date('H:i:s')
    ];

    // cek file json apakah ada nilai
    $jsondata = file_get_contents('json/message.json');
    $data = json_decode($jsondata, true);

    if(isset($data)) {
        // jika ada nilai
        array_push($data, $obj);
        $json = json_encode($data);
        $generate = file_put_contents('json/message.json', $json);
    }else {
        // jika tidak ada nilai
        $arr[] = (object)$obj;
        $generate = file_put_contents('json/message.json', json_encode($arr));
        if($generate) {
            echo "success!";
        }else{
            echo "failed!";
        }
    }   

    
    