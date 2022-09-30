function calcolaGiorni(data) {
    let tmpDate = new Date(data);
    let d1 = new Date(tmpDate.getFullYear() + "-" + (1 + tmpDate.getMonth()) + "-" + tmpDate.getDate() + " 00:00:00");
    tmpDate = new Date();
    let d2 = new Date(tmpDate.getFullYear() + "-" + (1 + tmpDate.getMonth()) + "-" + tmpDate.getDate() + " 00:00:00");
    return (d2 - d1) / (24 * 60 * 60 * 1000);
}

function checkIfComplete() {
    let out = true;
    var toBeCompleted = JSON.parse(sessionStorage.getItem("toBeCompleted"));
    Object.keys(toBeCompleted).forEach(p => { out = out && toBeCompleted[p] });
    if (out) {
        setTimeout(checkIfUpdated, 2000);
        window.dispatchEvent(new CustomEvent("dataLoaded"));
    } else {
        setTimeout(checkIfComplete, 2000);
    }
}

function checkIfUpdated() {
    let out = true;
    var toBeCompleted = JSON.parse(sessionStorage.getItem("toBeCompleted"));
    Object.keys(toBeCompleted).forEach(p => { out = out && toBeCompleted[p] });
    if (out) {
        window.dispatchEvent(new CustomEvent("dataUpdated"));
    } else {
        setTimeout(checkIfUpdated, 2000);
    }
}

function checkNewData() {
    var xhr = new XMLHttpRequest();
    var url = "be/checkNewData.php";
    var lastRead = sessionStorage.getItem("lastRead");
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                if (result.data) {
                    window.dispatchEvent(new CustomEvent("dataUpdated"));
                } else {
                    setTimeout(checkNewData, 2000);
                }
            }
        }
    }
    xhr.send("lastRead=" + lastRead);
}

function loadData() {
    $(".lds-grid").show();
    var toBeCompleted = {
        priorita: false,
        tipologie: false,
        richieste: false,
        swabs: false,
        ruoli: false,
        usca: false,
        uscaFull: false,
        statiTamponi: false,
        assistiti: false,
        statiAttivita: false
    };
    sessionStorage.setItem("toBeCompleted",JSON.stringify(toBeCompleted));
    getPriorita(toBeCompleted);
    getRuoli(toBeCompleted);
    getTipologie(toBeCompleted);
    getUsca(toBeCompleted);
    getUscaFull(toBeCompleted);
    getStatiTamponi(toBeCompleted);
    getAssistiti(toBeCompleted);
    getStatiAttivita(toBeCompleted);
    getData(toBeCompleted);
    setTimeout(checkIfComplete, 200);
}

function formattaData(data, lung) { // lung se impostato a true fa ottenere una data compresa dell'ora
    let out = data;
    if (data != null) {
        let dd = data.substr(8, 2);
        let mm = data.substr(5, 2);
        let yyyy = data.substr(0, 4)
        out = dd + "-" + mm + "-" + yyyy;
        if (lung && data.length > 10) {
            out += data.substr(10);
        }
    }
    return out;
}

function hideAll() {
    $(".sections").hide();
}

function checkUserPermission(user, permissionToCheck) {
    return (user.permissions.hasOwnProperty(permissionToCheck) && user.permissions[permissionToCheck]);
}

function getData(toBeCompleted) {
    var arc = sessionStorage.getItem("mostraStorico");
    var xhr = new XMLHttpRequest();
    var url = "be/getdata.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                var richieste = result.requests;
                var swabs = result.swabs;
                toBeCompleted.richieste = true;
                toBeCompleted.swabs = true;
                sessionStorage.setItem("toBeCompleted",JSON.stringify(toBeCompleted));
                sessionStorage.setItem("richieste",JSON.stringify(richieste));
                sessionStorage.setItem("swabs",JSON.stringify(swabs));
                if (result.hasOwnProperty("lastRead")) {
                    sessionStorage.setItem("lastRead", result.lastRead);
                }
            } else {
                Swal.fire({
                    text: "Impossibile recuperare l'elenco delle richieste.",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                })
            }
        }
    }
    xhr.send("lastRead=" + sessionStorage.getItem("lastRead")+"&arc="+arc);
}

function changeActivity(val){
    $(".swabs-form").hide();
    $(".users-form").hide();
    $(".requests-form").hide();
    $(".assistiti-form").hide();
    var richieste = JSON.parse(sessionStorage.getItem("richieste"));
    var swabs = JSON.parse(sessionStorage.getItem("swabs"));
    var assistiti = JSON.parse(sessionStorage.getItem("assistiti"));
    var lu = JSON.parse(sessionStorage.getItem("ricdomloggeduser"));
    switch(val){
        case "requests":
            $(".requests-form").show();
            showRequests(richieste, lu);
            break;
        case "swabs":
            $(".swabs-form").show();
            showSwabs(swabs,lu);
            break;
        case "users":
            $(".users-form").show();
            break;
        case "assistiti":
            $(".assistiti-form").show();
            showAssistiti(assistiti,lu);
            break;
        case "home":
            $(".home-form").show();
            break;
    }
    sessionStorage.setItem("activity",val);
}

function spostaFirma(){
    var op = $('#firma').offsetParent();
    var t = op.offset().top;
    var l = op.offset().right;
    var w = op.width();
    var h = op.height();
    var dh = $(document).height();
    var dw = $(document).width();
    var newbottom = t + h - dh + 55;
    var newright = l + w - dw + 20;
    $('#firma').css('bottom', newbottom + 'px').css('right', newright + 'px');
}