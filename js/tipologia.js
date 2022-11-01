function getTipologie(toBeCompleted) {
    var xhr = new XMLHttpRequest();
    var url = "be/gettipologia.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                toBeCompleted.tipologie = true;
                tipologie = result.data;
                sessionStorage.setItem("toBeCompleted",JSON.stringify(toBeCompleted));
                sessionStorage.setItem("tipologie",JSON.stringify(tipologie));
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero dell'elenco delle tipologie.",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                });
                tipologie = null;
            }
        }
    }
    xhr.send();
}