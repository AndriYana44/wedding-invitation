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

    $uuid = generateRandomString(36);
    $uuid_pesan = $_POST['uuid_pesan'];
    $replyerName = $_POST['replyerName'];
    $replyMessage = $_POST['replyMessage'];

    // conversi data menjadi array
    $array = [
        'uuid' => $uuid,
        'uuid_pesan' => $uuid_pesan,
        'nama' => $replyerName,
        'pesan' => $replyMessage,
        'date' => date('Y-m-d'),
        'time' => date('H:i:s')
    ];

    // cek file json apakah ada nilai
    $jsondata = file_get_contents('json/reply.json');
    $data = json_decode($jsondata, true);

    if(isset($data)) {
        // jika ada nilai
        array_push($data, $array);
        $json = json_encode($data);
        $generate = file_put_contents('json/reply.json', $json);
    }else {
        // jika tidak ada nilai
        $obj[] = (object)$array;
        $generate = file_put_contents('json/reply.json', json_encode($obj));
    } 

    echo json_encode($array);