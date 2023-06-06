ClassicEditor
    .create( document.querySelector( '#pesan' ) )
    .catch( error => {
        console.error( error );
    } );

const _generateBtn = document.getElementById('generate');
_generateBtn.addEventListener('click', function() {
    const _parent = this.closest('.parent');
    let name = _parent.querySelector('input[name=nama]');
    if(name.value == '') {
        swal({
            text:"Nama tamu tidak boleh kosong!",
            icon:'warning'
        });
    }else{
        _parent.querySelector('input[name=link]').setAttribute('value', `https://bestmarried.my.id/aguslaras/?to=${name.value}`);   
    }
});

function myFunction(e) {
    const _parent = e.closest('.parent');
    let name = _parent.querySelector('input[name=link]');
    if(name.value == '') {
        swal({
            text:"Generate link terlebih dahulu!",
            icon:'warning'
        });
    }else{
        const copyText = document.getElementById("pesan");
        let link = document.querySelector('input[name=link]').value;
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        let text = copyText.value;
        newText = text.replace("~clipboard~", link)
        navigator.clipboard.writeText(newText);
        
        swal({
            text: "Pesan berhasil di copy!",
            icon: "success",
            button: "oke",
        });
    }
}

function whasappFunction(e) {
    const _parent = e.closest('.parent');
    let name = _parent.querySelector('input[name=link]');
    if(name.value == '') {
        swal({
            text:"Generate link terlebih dahulu!",
            icon:'warning'
        });
    }else{
        const copyText = document.getElementById("pesan");
        let link = document.querySelector('input[name=link]').value;
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        let text = copyText.value;
        newText = text.replace("~clipboard~", link)
        navigator.clipboard.writeText(newText);

        window.location.href = `whatsapp://send/?text=${newText}`;
    }
};



