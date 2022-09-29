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
                sessionStorage.setItem("mostraStorico",false);
                sessionStorage.setItem("mostraTamponi",false);
                location.reload();
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
    location.reload();
}

function showLogin() {
    $("#login").show();
}

function hideLogin() {
    $("#login").hide();
}

function buildLogin() {
    $("#login").html("");
    var modal = $("#login").addClass("modal")/*.addClass("fade")*/.attr({"tabindex": "-1", "role": "dialog", "aria-labelledby": "loginTitle", "aria-hidden": "true" });
    var modalDialog = $("<div>").addClass("modal-dialog").attr({ "role": "document" });
    var modalContent = $("<div>").addClass("modal-content");
    var modalHeader = $("<div>").addClass("modal-header");
    var modalBody = $("<div>").addClass("modal-body");
    var modalFooter = $("<div>").addClass("modal-footer");

    var el = $("<h5>").addClass("modal-title").attr({ "id": "loginTitle" }).html("Login");
    modalHeader.append(el);
    modalContent.append(modalHeader);


    var div = $("<div>").addClass("row").addClass("align-self-center");
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

    el = $("<button>").addClass("btn").addClass("btn-primary").text("Conferma").attr({ "onClick": "login()" });
    modalFooter.append(el);
    modalContent.append(modalFooter);

    modalDialog.append(modalContent);
    modal.append(modalDialog);
}