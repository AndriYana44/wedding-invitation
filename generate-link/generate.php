<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generate Link</title>
    <link rel="icon" type="image/png" sizes="192x192" href="../assets/images/icon-192x192.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-4">
        <div class="row d-flex justify-content-center parent">
            <div class="col-xs-6 col-md-12 col-lg-6">
                <div class="card py-3 px-3 shadow">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="pesan">Pesan Undangan</label>
                            <textarea name="pesan" class="form-control" id="pesan" cols="30" rows="10">
Bismillahirrahmanirrahim

Assalamu'alaikum Warahmatullahi Wabarakatuh

Dengan memohon rahmat dan ridho Allah SWT, Kami bermaksud mengundang Bapak/Ibu/Sdr/i untuk menghadiri acara resepsi pernikahan kami. 

Agus Priatno & Laras Agustiani Sopandi

Akan dilaksanakan pada :
Hari, Tanggal : Sabtu, 29 July 2023
Jam : 10.00 - Selesai
Lokasi : Perum Telaga Harapan, Blok H1 No.6, RT.9/RW.12, Telagamurni, Cikarang Barat

Undangan dapat diakses melalui:
~clipboard~

Ungkapan terimakasih yang tulus dari kami apabila Bapak/Ibu/Sda/i berkenan hadir dan memberikan do'a restu kepada kami

Jazakumullahu Khairan Wassalamu'alaikum Warahmatullahi Wabarakatuh.
                            </textarea>
                        </div>
                        <div class="form-group mt-3">
                            <label for="nama">Nama Tamu</label>
                            <input type="text" class="form-control" name="nama">
                        </div>
                        <div class="form-group mt-3">
                            <label for="link">Generate Link</label>
                            <input type="text" class="form-control" name="link">
                            <button class="btn btn-outline-secondary mt-2" id="generate">Generate link</button>
                        </div>
                        
                        <button onclick="myFunction(this)" class="btn btn-outline-secondary mt-4">
                            <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
                            Copy text
                        </button>

                        <button onclick="whasappFunction(this)" class="btn btn-outline-secondary mt-4">
                            send whatsapp
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <script src="https://cdn.ckeditor.com/ckeditor5/38.0.1/classic/ckeditor.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    <script src="app.js"></script>
</body>
</html>