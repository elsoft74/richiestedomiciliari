function getFasi(toBeCompleted) {
    let xhr = new XMLHttpRequest();
    let url = "be/getfasi.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                toBeCompleted.fasi = true;
                fasi = result.data;
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero dell'elenco delle fasi.",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                });
                fasi = null;
            }
        }
    }
    xhr.send();
}