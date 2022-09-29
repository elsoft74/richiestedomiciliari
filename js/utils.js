function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (5 * 3600000)); // validità 5h
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cname) {
    if (getCookie(cname)) {
        document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}


function calcolaGiorni(data) {
    let tmpDate = new Date(data);
    let d1 = new Date(tmpDate.getFullYear() + "-" + (1 + tmpDate.getMonth()) + "-" + tmpDate.getDate() + " 00:00:00");
    tmpDate = new Date();
    let d2 = new Date(tmpDate.getFullYear() + "-" + (1 + tmpDate.getMonth()) + "-" + tmpDate.getDate() + " 00:00:00");
    return (d2 - d1) / (24 * 60 * 60 * 1000);
}

function checkIfComplete() {
    let out = true;
    Object.keys(toBeCompleted).forEach(p => { out = out && toBeCompleted[p] });
    if (out) {
        setTimeout(checkIfUpdated, 1000);
        window.dispatchEvent(new CustomEvent("dataLoaded"));
    } else {
        setTimeout(checkIfComplete, 1000);
    }
}

function checkIfUpdated() {
    let out = true;
    Object.keys(toBeCompleted).forEach(p => { out = out && toBeCompleted[p] });
    if (out) {
        // console.log("Aggiorno");
        window.dispatchEvent(new CustomEvent("dataUpdated"));
    } else {
        // console.log("Aggiornamenti non ancora pronti");
        setTimeout(checkIfUpdated, 200);
    }
}

function checkNewData() {
    let activity = sessionStorage.getItem("activity");
    let xhr = new XMLHttpRequest();
    let url = "be/checkNewData.php";
    let lastRead = sessionStorage.getItem("lastRead");
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var time=Date();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // console.log("RECEIVED->"+time+" "+xhr.responseText);
            result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                if (result.data) {
                    window.dispatchEvent(new CustomEvent("dataUpdated"));
                } else {
                    setTimeout(checkNewData, 1000);
                }
            }
        }
    }
    // console.log("SENT->"+time+" lastRead=" + lastRead );
    xhr.send("lastRead=" + lastRead);
}

function loadData() {
    $(".lds-grid").show();
    toBeCompleted = {
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
    priorita = null;
    tipologie = null;
    usca = null;
    ruoli = null;
    richieste = [];
    getPriorita(toBeCompleted);
    getRuoli(toBeCompleted);
    getTipologie(toBeCompleted);
    getUsca(toBeCompleted);
    getUscaFull(toBeCompleted);
    getStatiTamponi(toBeCompleted);
    getAssistiti(toBeCompleted);
    getStatiAttivita(toBeCompleted);
    //readRequests(toBeCompleted);
    //readSwabs(toBeCompleted);
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
    var table = Tabulator.findTable("#main")[0];
    var arc = sessionStorage.getItem("mostraStorico");
    var rowCount = 0;
    if (table != null && table != undefined) {
        rowCount = table.getDataCount();
    }
    if (rowCount == 0) {
        sessionStorage.setItem("lastRead", null);
    }
    let xhr = new XMLHttpRequest();
    let url = "be/getdata.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let ready = false;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                richieste = result.requests;
                toBeCompleted.richieste = true;
                swabs = result.swabs;
                toBeCompleted.swabs = true;
                if (result.hasOwnProperty("lastRead")) {
                    sessionStorage.setItem("lastRead", result.lastRead);
                }
                //setTimeout(checkIfAreUpdatedData, 1000);
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
    //xhr.send();
    xhr.send("lastRead=" + sessionStorage.getItem("lastRead")+"&arc="+arc);
}

function changeActivity(val){
    $(".swabs-form").hide();
    $(".users-form").hide();
    $(".requests-form").hide();
    $(".assistiti-form").hide();
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