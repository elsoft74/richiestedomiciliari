function login() {
    let username = $("#username").val();
    let password = $("#password").val();
    let xhr = new XMLHttpRequest();
    let url = "be/login.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                lu = result.data;
                sessionStorage.setItem("ricdomloggeduser", JSON.stringify(lu));
                sessionStorage.setItem("mostraStorico", false);
                sessionStorage.setItem("mostraTamponi", false);
                if (lu.permissions.canChangeUsca != null && lu.permissions.canChangeUsca) {
                    buildChangeUsca();
                } else {
                    location.reload();
                }
            } else {
                Swal.fire({
                    text: result.error,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                })
            }
        }
    }
    xhr.send("username=" + username + "&password=" + password);
}

function logout() {
    sessionStorage.clear();
    $("#username").val("");
    $("#password").val("");
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
    location.reload();
}

function showLogin() {
    $("#login").modal("show");
}

function hideLogin() {
    $("#login").modal("hide");
}

function buildLogin() {
    $("#login").html("");
    var modal = $("#login").addClass("modal")/*.addClass("fade")*/.attr({ "tabindex": "-1", "role": "dialog", "aria-labelledby": "loginTitle", "aria-hidden": "true" });
    var modalDialog = $("<div>").addClass("modal-dialog").attr({ "role": "document" });
    var modalContent = $("<div>").addClass("modal-content");
    var modalHeader = $("<div>").addClass("modal-header");
    var modalBody = $("<div>").addClass("modal-body");
    var modalFooter = $("<div>").addClass("modal-footer");

    var el = $("<h5>").addClass("modal-title").attr({ "id": "loginTitle" }).html("Login");
    modalHeader.append(el);
    modalContent.append(modalHeader);


    var div = $("<div>").addClass("row login").addClass("align-self-center").attr({ "id": "loginData" });
    el = $("<label>").attr({ "for": "username" }).text("Nome utente");
    div.append(el);
    el = $("<input>").attr({ "type": "text", "id": "username" });
    div.append(el);
    el = $("<label>").attr({ "for": "password" }).text("Password");
    div.append(el);
    el = $("<input>").attr({ "type": "password", "id": "password" });
    div.append(el);
    modalBody.append(div);

    modalContent.append(modalBody);

    el = $("<button>").addClass("btn login").addClass("btn-primary").text("Conferma").attr({ "onClick": "login()" });
    modalFooter.append(el);
    modalContent.append(modalFooter);

    modalDialog.append(modalContent);
    modal.append(modalDialog);

}

function buildChangeUsca() {
    var xhr = new XMLHttpRequest();
    var url = "be/getusca.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                $("#changeUsca").html("");
                var modal = $("#changeUsca").addClass("modal")/*.addClass("fade")*/.attr({ "tabindex": "-1", "role": "dialog", "aria-labelledby": "loginTitle", "aria-hidden": "true" });
                var modalDialog = $("<div>").addClass("modal-dialog").attr({ "role": "document" });
                var modalContent = $("<div>").addClass("modal-content");
                var modalHeader = $("<div>").addClass("modal-header");
                var modalBody = $("<div>").addClass("modal-body");
                var modalFooter = $("<div>").addClass("modal-footer");

                var el = $("<h5>").addClass("modal-title").attr({ "id": "loginTitle" }).html("Selezione Team");
                modalHeader.append(el);
                modalContent.append(modalHeader);


                var div = $("<div>").addClass("row selectUsca").addClass("align-self-center").attr({ "id": "selectUsca" });
                el = $("<label>").attr({ "for": "elencoUsca" }).text("Team con cui operare");
                div.append(el);
                el = $("<select>").attr({ "id": "elencoUsca" });
                div.append(el);
                result.data.forEach(element => {
                    let el1 = $("<option>").text(element.descrizione).val(element.id);
                    el.append(el1);
                });
                div.append(el);
                modalBody.append(div);

                modalContent.append(modalBody);

                el = $("<button>").addClass("btn selectUsca").addClass("btn-primary").text("Conferma").attr({ "onClick": "changeUsca()" });
                modalFooter.append(el);
                modalContent.append(modalFooter);

                modalDialog.append(modalContent);
                modal.append(modalDialog);
                $("#login").modal("hide");
                modal.modal("show");
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