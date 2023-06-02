<?php
    // set timezone
    date_default_timezone_set('Asia/Jakarta');

    $uuid = $_POST['uuid'];
    $uuid_pesan = $_POST['uuid_pesan'];
    $replyerName = $_POST['replyerName'];
    $replyMessage = $_POST['replyMessage'];

    // conversi data menjadi array
    $array = [
        'uuid' => $uuid,
        'uuid_pesan' => $uuid_pesan,
        'nama' => $replyerName,
        'pesan' => $replyMessage,
        'date' => date('Y/m/d'),
        'time' => date('H:i:s')
    ];

    // cek file json apakah ada nilai
    $jsondata = file_get_contents('./json/reply.json');
    $data = json_decode($jsondata, true);

    if(isset($data)) {
        // jika ada nilai
        array_push($data, $array);
        $json = json_encode($data);
        $generate = file_put_contents('./json/reply.json', $json);
    }else {
        // jika tidak ada nilai
        $obj[] = (object)$array;
        $generate = file_put_contents('./json/reply.json', json_encode($obj));
    } 

    echo json_encode($array);