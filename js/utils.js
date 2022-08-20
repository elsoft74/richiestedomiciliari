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
    Object.keys(toBeCompleted).forEach(p=>{out=out&&toBeCompleted[p]});
    if (out) {
        window.dispatchEvent(new CustomEvent("dataLoaded"));
    } else {
        setTimeout(checkIfComplete, 200);
    }
}

function checkIfUpdated() {
    if (toBeCompleted.richieste) {
        console.log("Aggiorno");
        window.dispatchEvent(new CustomEvent("dataUpdated"));
    } else {
        console.log("Aggiornamenti non ancora pronti");
        setTimeout(checkIfUpdated, 200);
    }
}

function loadData() {
    toBeCompleted = {
        priorita: false,
        tipologie: false,
        richieste: false,
        ruoli: false,
        usca: false
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
    readRequests(toBeCompleted);
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

function hideAll(){
    $(".sections").hide();
}

function checkUserPermission(user,permissionToCheck){
    return (user.permissions.hasOwnProperty(permissionToCheck) && user.permissions[permissionToCheck]);
}