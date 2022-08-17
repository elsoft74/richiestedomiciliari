function getRuoli(toBeCompleted) {
    let xhr = new XMLHttpRequest();
    let url = "be/getruoli.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                toBeCompleted.ruoli = true;
                ruoli = result.data;
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero dell'elenco dei ruoli.",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                });
                ruoli = null;
            }
        }
    }
    xhr.send();
}