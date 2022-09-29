function getUsca(toBeCompleted) {
    var xhr = new XMLHttpRequest();
    var url = "be/getusca.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                toBeCompleted.usca = true;
                var usca = result.data;
                sessionStorage.setItem("toBeCompleted",JSON.stringify(toBeCompleted));
                sessionStorage.setItem("usca",JSON.stringify(usca));
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero dell'elenco delle usca.",
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

function getUscaFull(toBeCompleted) {
    var xhr = new XMLHttpRequest();
    var url = "be/getuscafull.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                toBeCompleted.uscaFull = true;
                var uscaFull = result.data;
                sessionStorage.setItem("toBeCompleted",JSON.stringify(toBeCompleted));
                sessionStorage.setItem("uscaFull",JSON.stringify(uscaFull));
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero dell'elenco dei team.",
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