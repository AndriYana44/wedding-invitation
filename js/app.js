function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
}

function currentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    
    today = yyyy + '/' + mm + '/' + dd;
    return today;
}

function currentTime() {
    let dateTime = new Date();
    let hour = String(dateTime.getHours());
    let minute = String(dateTime.getMinutes());
    
    let time = hour + ':' + minute;
    return time;
}

const getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const audio = (() => {
    var instance = undefined;

    var getInstance = () => {
        if (!instance) {
            instance = new Audio();
            instance.autoplay = true;
            instance.src = document.getElementById('tombol-musik').getAttribute('data-url');
            instance.load();
            instance.currentTime = 0;
            instance.volume = 1;
            instance.muted = false;
            instance.loop = true;
        }

        return instance;
    };

    return {
        play: () => {
            getInstance().play();
        },
        pause: () => {
            getInstance().pause();
        }
    };
})();

const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

const salin = (btn) => {
    let norek = btn.getAttribute('data-nomer');
    navigator.clipboard.writeText(norek);
    let tmp = btn.innerHTML;
    btn.innerHTML = 'Tersalin';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = tmp;
        btn.disabled = false;
    }, 1500);
};

const timer = () => {
    var countDownDate = (new Date(document.getElementById('tampilan-waktu').getAttribute('data-waktu').replace(' ', 'T'))).getTime();
    var time = undefined;
    var distance = undefined;

    time = setInterval(() => {
        distance = countDownDate - (new Date()).getTime();

        if (distance < 0) {
            clearInterval(time);
            time = undefined;
            return;
        }

        document.getElementById('hari').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById('jam').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('menit').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('detik').innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
};

const buka = async () => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('tombol-musik').style.display = 'block';
    audio.play();
    AOS.init();
    timer();
};

const play = (btn) => {
    if (btn.getAttribute('data-status').toString() != 'true') {
        btn.setAttribute('data-status', 'true');
        audio.play();
        btn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    } else {
        btn.setAttribute('data-status', 'false');
        audio.pause();
        btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
};

const resetForm = () => {
    document.getElementById('kirim').style.display = 'block';
    document.getElementById('hadiran').style.display = 'block';
    document.getElementById('labelhadir').style.display = 'block';
    document.getElementById('batal').style.display = 'none';
    document.getElementById('kirimbalasan').style.display = 'none';
    document.getElementById('idbalasan').value = null;
    document.getElementById('balasan').innerHTML = null;
    document.getElementById('formnama').value = null;
    document.getElementById('hadiran').value = 0;
    document.getElementById('formpesan').value = null;
};

const renderCard = (data) => {
    let to  = getUrlParameter('to');
    const DIV = document.createElement('div');
    DIV.classList.add('mb-3', 'list-ucapan');
    DIV.setAttribute('uuid', data.uuid);
    let node = `
    <div class="card-body bg-light shadow p-3 m-0 rounded-4">
    <div class="d-flex flex-wrap justify-content-between align-items-center">
    <p class="text-dark text-truncate m-0 p-0" style="font-size: 0.95rem;">
    <strong class="me-1">${titleCase(data.nama)} &nbsp; ${data.kehadiran > 1 ? '<small class="kehadiran permission">Berhalangan</small>' : '<small class="kehadiran present">Hadir</small>'}</strong>
    </p>
    <small class="text-dark m-0 p-0" style="font-size: 0.75rem;">${data.date} &nbsp; ${data.time}</small>
    </div>
    <hr class="text-dark my-1">
    <p class="text-dark mt-0 mb-1 mx-0 p-0" style="white-space: pre-line">${data.ucapan}</p>
    <div class="formbalasan">
    </div>`;
    node += 
    `<button style="font-size: 0.8rem;" id="balas" uuid="${data.uuid}" class="btn btn-sm btn-outline-dark rounded-4 py-0">Balas</button>`;
    if(to == 'owner') {
        node += `
        <button style="font-size: 0.8rem;" uuid="${data.uuid}" class="btn btn-sm btn-outline-danger hapus_pesan rounded-4 py-0">Hapus</button>
        </div>`;
    }
    DIV.innerHTML = node;
    return DIV;
};

const renderCardReply = data => {
    let to  = getUrlParameter('to');
    const DIV = document.createElement('div');
    DIV.classList.add('my-3', 'list-reply');
    DIV.setAttribute('uuid', data.uuid);
    let node = `
        <div class="card-body bg-light shadow p-3 m-0 rounded-4">
        <div class="d-flex flex-wrap justify-content-between align-items-center">
        <p class="text-dark text-truncate m-0 p-0 sender" style="font-size: 0.95rem;">`;
    if(to == 'owner') {
        node += `<span id="remove_replyed" uuid="${data.uuid}" class="mr-3 hapus_replyed">Hapus</span>`;
    } 
    node += 
        `<strong class="me-1">${titleCase(data.nama)}</strong> 
        </p>
        <small class="text-dark m-0 p-0" style="font-size: 0.75rem;">${data.date} &nbsp; ${data.time}</small>
        </div>
        <hr class="text-dark my-1">
        <p class="text-dark mt-0 mb-1 mx-0 p-0" style="white-space: pre-line">${data.pesan}</p>
        </div>`;

    DIV.innerHTML = node;
    return DIV;
}

// cek jika ada pesan baru
setInterval(function() {
    const UUID_ARRAY = [];
    const UUID_ELEMENT = [];
    $.getJSON('./json/message.json', data => {
        // push data ke array
        $.each(data, (i, v) => {
            UUID_ARRAY.push(v.uuid);
        });        
        // cek apakah ada pesan yang belum di display
        $.each($('.list-ucapan'), (i, v) => {
            const index = UUID_ARRAY.indexOf($(v).attr('uuid'));
            if(index > -1) {
                UUID_ARRAY.splice(index, 1);
            }
        });

        if(UUID_ARRAY.length > 0) {
            $.each(data, (i, d) => {
                $.each(UUID_ARRAY, (i, v) => {
                    if(d.uuid == v) {
                        let ucapan = renderCard(d);
                        $(ucapan).hide().prependTo('#daftarucapan').slideDown(500);
                    }
                });
            });
        }
    });
}, 5000);

// cek jika ada balasan baru
setInterval(function() {
    const UUID_ARRAY = [];
    $.getJSON('./json/reply.json', data => {
        $.each(data, (i, v) => {
            UUID_ARRAY.push(v.uuid);
        }); 

        $.each($('.list-reply'), (i, v) => {
            const index = UUID_ARRAY.indexOf($(v).attr('uuid'));
            if(index > -1) {
                UUID_ARRAY.splice(index, 1);
            }
        });

        if(UUID_ARRAY.length > 0) {
            // masukan pesan yang belum di display
            $.each(data, (i, d) => {
                $.each(UUID_ARRAY, (i, v) => {
                    if(d.uuid == v) {
                        $.each($('.list-ucapan'), function(i, el) {
                            if($(el).attr('uuid') == d.uuid_pesan) {
                                let reply = renderCardReply(d);
                                let element = $(el).find('.formbalasan');
                                $(reply).hide().appendTo(element).slideDown(500);
                            }
                        });
                    }
                });
            });
        }
    });
}, 5000);

// masukan semua ucapan
$.getJSON('json/message.json', (data) => {
    $.each(data, function(i,v) {
        let ucapan = renderCard(v);
        $('#daftarucapan').append(ucapan);
    });
});
    
// masukan semua balasan
$.getJSON('./json/reply.json', (data) => {
    $.each($('.list-ucapan'), function(i,vE) {
        $.each(data, function(i,vD) {
            if($(vE).attr('uuid') == vD.uuid_pesan) {
                let reply = renderCardReply(vD);
                $(vE).find('.formbalasan').append(reply);
            }
        });
    });
});


$(document).on('click', '.hapus_pesan', function(e) {
    let uuid = $(this).attr('uuid');
    $.ajax({
        url: 'json-delete-message.php',
        type: 'POST',
        data: {uuid:uuid, tipe:'hapus_pesan'},
        success: function(res) {
            console.log(res);
            $(e.target).closest('.list-ucapan').remove();
        }
    })
});

$(document).on('click', '.hapus_replyed', function(e) {
    let uuid = $(this).attr('uuid');
    console.log(uuid);
});

const KIRIM_BTN = document.getElementById('kirim');
KIRIM_BTN.addEventListener('click', (e) => {
    e.preventDefault();
    const uuid = makeid(36); 
    const _parentEl = $(e.target).closest('.card-body');

    // get value list
    const name = _parentEl.find('input[name=nama]').val();
    const kehadiran = _parentEl.find('select[name=kehadiran]').find(':selected').val();
    const ucapan = _parentEl.find('textarea[name=ucapan]').val();

    $.ajax({
        type: "POST",
        url: "json-generate.php",
        data: {
            uuid: uuid,
            nama: name, 
            kehadiran: kehadiran, 
            ucapan: ucapan
        },
        complete: function(res) {
            const data = {
                'uuid':uuid, 
                'nama':name, 
                'kehadiran':kehadiran, 
                'ucapan':ucapan, 
                'date':currentDate(), 
                'time':currentTime()
            }; 
            const ucapanEl = renderCard(data);
            $('#daftarucapan').prepend(ucapanEl);
            console.log(res);
            console.log(data);

            // clear value list
            _parentEl.find('input[name=nama]').val('');
            _parentEl.find('select[name=kehadiran]').find(':selected').removeAttr('selected');
            _parentEl.find('textarea[name=ucapan]').val('');
        }
    })
});

function clearFormBalas(){
    $.each($('.formbalasan'), function(i,v) {
        $(v).find('#formbalasan').slideUp(300, function() { $(this).remove(); });
    });
}

$(document).on('click', '#balas', function(e) {
    const uuid = makeid(36);
    let formPlace = $(e.target).siblings('.formbalasan');
    let typingBalasan = formPlace.find('#balasan').val();
    if(typingBalasan == undefined || typingBalasan == '' || typingBalasan == null) {
        clearFormBalas();
        const _balasanEl = `
            <div id="formbalasan">
                <div class="mb-3">
                    <input type="text" class="form-control shadow-sm" name="naama" id="namabalasan" placeholder="Isikan Nama Anda" required>
                </div>
                <div class="mb-3">
                    <textarea class="form-control" id="balasan" rows="4" name="balasan" required></textarea>
                </div>
            </div>`;
        $(_balasanEl).hide().appendTo(formPlace).slideDown(800);

        $.each($(document).find('.formbalasan'), function(i,v) {
            $(v).siblings('#balas').html('Balas');
        });
        $(this).html('Kirim');
    }else{
        const uuid_pesan = $(e.target).attr('uuid');
        const replyerName = formPlace.find('#namabalasan').val();
        const replyMessage = formPlace.find('#balasan').val();
        clearFormBalas();

        $.ajax({
            type: 'POST',
            url: 'json-reply-generate.php',
            data: {
                uuid: uuid,
                uuid_pesan: uuid_pesan,
                replyerName: replyerName,
                replyMessage: replyMessage
            },
            complete: function() {
                const data = {
                    'uuid':uuid,
                    'uuid_pesan':uuid_pesan,
                    'nama':replyerName,
                    'pesan':replyMessage
                };
                console.log(data);

                const reply = renderCardReply(data);
                $(reply).hide().appendTo(formPlace).slideDown(300);
            }
        });
    }
});

const renderLoading = (num) => {
    let hasil = '';
    for (let index = 0; index < num; index++) {
        hasil += `
        <div class="mb-3">
            <div class="card-body bg-light shadow p-3 m-0 rounded-4">
                <div class="d-flex flex-wrap justify-content-between align-items-center placeholder-glow">
                    <span class="placeholder bg-secondary col-5"></span>
                    <span class="placeholder bg-secondary col-3"></span>
                </div>
                <hr class="text-dark my-1">
                <p class="card-text placeholder-glow">
                    <span class="placeholder bg-secondary col-6"></span>
                    <span class="placeholder bg-secondary col-5"></span>
                    <span class="placeholder bg-secondary col-12"></span>
                </p>
            </div>
        </div>`;
    }

    return hasil;
}

const pagination = (() => {

    const perPage = 10;
    var pageNow = 0;
    var resultData = 0;

    var disabledPrevious = () => {
        document.getElementById('previous').classList.add('disabled');
    };

    var disabledNext = () => {
        document.getElementById('next').classList.add('disabled');
    };

    var buttonAction = async (button) => {
        let tmp = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Loading...`;
        await ucapan();
        button.disabled = false;
        button.innerHTML = tmp;
        document.getElementById('daftarucapan').scrollIntoView({ behavior: 'smooth' });
    };

    return {
        getPer: () => {
            return perPage;
        },
        getNext: () => {
            return pageNow;
        },
        reset: async () => {
            pageNow = 0;
            resultData = 0;
            await ucapan();
            document.getElementById('next').classList.remove('disabled');
            disabledPrevious();
        },
        setResultData: (len) => {
            resultData = len;
            if (resultData < perPage) {
                disabledNext();
            }
        },
        previous: async (button) => {
            if (pageNow < 0) {
                disabledPrevious();
            } else {
                pageNow -= perPage;
                disabledNext();
                await buttonAction(button);
                document.getElementById('next').classList.remove('disabled');
                if (pageNow <= 0) {
                    disabledPrevious();
                }
            }
        },
        next: async (button) => {
            if (resultData < perPage) {
                disabledNext();
            } else {
                pageNow += perPage;
                disabledPrevious();
                await buttonAction(button);
                document.getElementById('previous').classList.remove('disabled');
            }
        }
    };
})();

window.addEventListener('load', () => {
    let modal = new bootstrap.Modal('#exampleModal');
    let name = (new URLSearchParams(window.location.search)).get('to') ?? '';
    let to = getUrlParameter('to');

    if (name.length == 0) {
        document.getElementById('namatamu').remove();
    } else {
        let div = document.createElement('div');
        div.classList.add('m-2');
        let el = '';
        el += `<h2 class="text-light py-2" style="font-size:14px">*** ${escapeHtml(name)} ***</h2>`;
        div.innerHTML = el;

        document.getElementById('formnama').value = name;
        document.getElementById('namatamu').appendChild(div);
    }

    modal.show();
}, false);

function changeImage() {   
    const BackgroundImg=["images/mempelai/Cover1.jpg",
        "images/mempelai/Cover2.jpg",
        "images/mempelai/Cover3.jpg"
    ];
    let i = Math.floor((Math.random() * 3));
    const el = document.querySelector('.cover');
    el.style.backgroundImage = 'url("' + BackgroundImg[i] + '")';
}
window.setInterval(changeImage, 2000);

if(getUrlParameter('to') != 'owner') {
    $(document).find('#generate-link').remove();
}
