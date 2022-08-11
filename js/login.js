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
                localStorage.setItem("loggeduser", JSON.stringify(lu));
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
    localStorage.removeItem("loggeduser");
    localStorage.removeItem("lastRead");
    $("#username").val("");
    $("#password").val("");
    location.reload();
}

function showLogin() {
    $("#login").fadeIn();
}

function hideLogin() {
    $("#login").fadeOut();
}

function buildLogin() {
    $("#login").html("");
    let modal = $("#login").addClass("modal")/*.addClass("fade")*/.attr({"tabindex": "-1", "role": "dialog", "aria-labelledby": "loginTitle", "aria-hidden": "true" });
    let modalDialog = $("<div>").addClass("modal-dialog").attr({ "role": "document" });
    let modalContent = $("<div>").addClass("modal-content");
    let modalHeader = $("<div>").addClass("modal-header");
    let modalBody = $("<div>").addClass("modal-body");
    let modalFooter = $("<div>").addClass("modal-footer");

    let el = $("<h5>").addClass("modal-title").attr({ "id": "loginTitle" }).html("Login");
    modalHeader.append(el);
    modalContent.append(modalHeader);


    let div = $("<div>").addClass("row").addClass("align-self-center");
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