<?php
    // set timezone
    date_default_timezone_set('Asia/Jakarta');
    // mendapatkan data dari form
    $name = $_POST['nama'];
    $present = $_POST['kehadiran'];
    $message = $_POST['ucapan'];

    // conversi data menjadi array
    $obj = [
        'nama' => $name,
        'kehadiran' => $present,
        'ucapan' => $message,
        'date' => date('Y-m-d'),
        'time' => date('H:i:s')
    ];

    // cek file json apakah ada nilai
    $jsondata = file_get_contents('./message.json');
    $data = json_decode($jsondata, true);

    if(isset($data)) {
        // jika ada nilai
        array_push($data, $obj);
        $json = json_encode($data);
        $generate = file_put_contents('./message.json', $json);
    }else {
        // jika tidak ada nilai
        $arr[] = (object)$obj;
        $generate = file_put_contents('./message.json', json_encode($arr));
    }   
    
    