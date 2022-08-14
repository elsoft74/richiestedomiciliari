function getPriorita(toBeCompleted) {
    let xhr = new XMLHttpRequest();
    let url = "be/getpriorita.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                toBeCompleted.priorita = true;
                priorita = result.data;
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero dell'elenco delle priorità.",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                });
                priorita = null;
            }
        }
    }
    xhr.send();
}