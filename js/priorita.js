function getPriorita(toBeCompleted) {
    var xhr = new XMLHttpRequest();
    var url = "be/getpriorita.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                toBeCompleted.priorita = true;
                priorita = result.data;
                sessionStorage.setItem("toBeCompleted",JSON.stringify(toBeCompleted));
                sessionStorage.setItem("priorita",JSON.stringify(priorita));
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero dell'elenco delle priorità.",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                });
                priorita = null;
                sessionStorage.setItem("priorita",JSON.stringify(priorita));
            }
        }
    }
    xhr.send();
}