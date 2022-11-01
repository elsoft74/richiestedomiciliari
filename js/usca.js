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
                sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
                sessionStorage.setItem("usca", JSON.stringify(usca));
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero dell'elenco delle usca.",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                });
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
                sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
                sessionStorage.setItem("uscaFull", JSON.stringify(uscaFull));
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero dell'elenco dei team.",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                });
            }
        }
    }
    xhr.send();
}

function changeUsca() {
    var actualUsca = sessionStorage.getItem("activeUsca");
    var newUsca = parseInt($("#elencoUsca").val());
    if (actualUsca != newUsca) {
        var swabs = Tabulator.findTable("#mainSwabs")[0];
        var assistiti = Tabulator.findTable("#assistiti")[0];
        var richieste = Tabulator.findTable("#main")[0];
        if (swabs != null) {
            swabs.clearData();
        }
        if (assistiti != null) {
            assistiti.clearData();
        }
        if (richieste != null) {
            richieste.clearData();
        }
        sessionStorage.setItem("activeUsca", newUsca);
        $("#changeUsca").modal("hide");
        location.reload();
    } else {
        $("#changeUsca").modal("hide");
    }
}