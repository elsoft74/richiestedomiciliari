function showUsers() {
    $("#main").html("");
    $(".requests-form-btn").hide();
    $(".users-form-btn").show();
    getUsers();
}

function getUsers() {
    let lu = localStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        loggedUser = JSON.parse(lu);
        let username = loggedUser.username;
        let token = "123456";
        let xhr = new XMLHttpRequest();
        let url = "be/getusers.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                result = JSON.parse(xhr.responseText);
                showUsersTable(result);
            }
        }
        xhr.send("username=" + username + "&token=" + token);
    }

}

function showUsersTable(users) {
    if (users.status == "OK") {
        $("#users").html("");

        var table = new Tabulator("#users", {
            data: users.data,           //load row data from array
            layout: "fitColumns",      //fit columns to width of table
            responsiveLayout: "hide",  //hide columns that dont fit on the table
            //tooltips: true,            //show tool tips on cells
            addRowPos: "top",          //when adding a new row, add it to the top of the table
            history: true,             //allow undo and redo actions on the table
            pagination: "local",       //paginate the data
            paginationSize: 12,         //allow 7 rows per page of data
            paginationCounter: "rows", //display count of paginated rows in footer
            movableColumns: true,      //allow column order to be changed
            initialSort: [             //set the initial sort order of the data
                { column: "dataRic", dir: "asc" },
            ],
            columns: [                 //define the table columns
                { title: "id", field: "id", width: 10, editor: false, hozAlign: "center" },
                {
                    title: "", width: 10, hozAlign: "center", editor: false, cellClick: showUserUpdate, formatter: function (cell, formatterParams, onRendered) {

                        return '<span class="material-symbols-outlined" style="color: green">edit</span>';
                    },
                },
                { title: "Username", field: "username", editor: false },
                { title: "Nome", field: "nome", editor: false },
                { title: "Cognome", field: "cognome", editor: false },
                { title: "e-mail", field: "email", editor: false },
                { title: "Ruolo", field: "role_id", editor: false },
                { title: "Attivo", field: "is_active", editor: false },
            ],
        });
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

var showUserUpdate = function (e, row) {
    $("#editUser").fadeIn();
    var element = row.getData();
    $("#editIdUser").val(element.id);
    $("#editNomeUser").val(element.nome);
    $("#editCognomeUser").val(element.cognome);
    $("#editUsernameUser").val(element.username);
    $("#editEmailUser").val(element.email);
    $("#editRoleIdUser").val(element.role_id);
    $("#editIsActivedUser").val(element.is_active);
}

function inserisciUser() {
    let lu = localStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        loggedUser = JSON.parse(lu);
        let username = loggedUser.username;
        let token = "123456";
        let xhr = new XMLHttpRequest();
        let url = "be/insertUser.php";
        let user = {};
        user.nome = $("#nomeUser").val();
        user.cognome = $("#cognomeUser").val();
        user.username = $("#usernameUser").val();
        user.email = $("#emailUser").val();
        user.password = $("#passwordUser").val();
        user.roleId = $("#roleIdUser").val();
        let err="";
        err+=(user.nome=="")?"Nome vuoto\n":"";
        err+=(user.cognome=="")?"Cognome vuoto\n":"";
        err+=(user.username=="")?"Username vuoto\n":"";
        err+=(user.email=="")?"E-mail vuota\n":"";
        err+=(user.password=="")?"Password vuota\n":"";
        err+=(user.roleId=="")?"Ruolo non selezionato\n":"";
        if (err=="") {
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    result = JSON.parse(xhr.responseText);
                    if(result.status=="OK"){
                        Swal.fire({
                            text: "Operazione completata",
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                cleanUserInsert();
                                showUsers();
                            }
                        })
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
            xhr.send("username=" + username + "&token=" + token + "&user=" + JSON.stringify(user));
        } else {
            Swal.fire({
                text: err,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            })
        }
    }

}

function aggiornaUser() {
    let lu = localStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        loggedUser = JSON.parse(lu);
        let username = loggedUser.username;
        let token = "123456";
        let xhr = new XMLHttpRequest();
        let url = "be/editUser.php";
        let user = {};
        user.id = $("#editIdUser").val();
        user.nome = $("#editNomeUser").val();
        user.cognome = $("#editCognomeUser").val();
        user.username = $("#editUsernameUser").val();
        user.email = $("#editEmailUser").val();
        user.password = $("#editPasswordUser").val();
        user.roleId = $("#editRoleIdUser").val();
        user.isActive = $("#editIsActivedUser").val();
        let err="";
        err+=(user.nome=="")?"Nome vuoto\n":"";
        err+=(user.cognome=="")?"Cognome vuoto\n":"";
        err+=(user.username=="")?"Username vuoto\n":"";
        err+=(user.email=="")?"E-mail vuota\n":"";
        err+=(user.roleId=="")?"Ruolo non selezionato\n":"";
        err+=(user.roleId=="")?"Attivo non selezionato\n":"";
        if (err=="") {
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    result = JSON.parse(xhr.responseText);
                    if(result.status=="OK"){
                        Swal.fire({
                            text: "Operazione completata",
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                cleanUserEdit();
                                showUsers();
                            }
                        })
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
            xhr.send("username=" + username + "&token=" + token + "&user=" + JSON.stringify(user));
        } else {
            Swal.fire({
                text: err,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            })
        }
    }

}

function buildUserInsertForm(target) {

    let canBuild=false;
    switch(target){
        case "insertUser":
            tar="#insertUser";
            fun1="inserisciUser()";
            fun2="cleanUserInsert()";
            attrs={
                id:"idUser",
                nome:"nomeUser",
                cognome:"cognomeUser",
                username:"usernameUser",
                email:"emailUser",
                roleId:"roleIdUser",
                password:"passwordUser",
                titleId:"insertModalTitle",
                titleText:"Inserisci nuovo utente"
            }
            canBuild=true;
            break;
        case "editUser":
            tar="#editUser";
            fun1="aggiornaUser()";
            fun2="cleanUserEdit()";
            attrs={
                id:"editIdUser",
                nome:"editNomeUser",
                cognome:"editCognomeUser",
                username:"editUsernameUser",
                email:"editEmailUser",
                roleId:"editRoleIdUser",
                password:"editPasswordUser",
                isActive:"editIsActivedUser",
                titleId:"editModalTitle",
                titleText:"Modifica utente"
            }
            canBuild=true;
            break;
    }

    if (canBuild) {
        let modal = $(tar).addClass("modal")/*.addClass("fade")*/.attr({"id":target,"tabindex":"-1", "role":"dialog", "aria-labelledby":attrs.titleId, "aria-hidden":"true"});
        let modalDialog = $("<div>").addClass("modal-dialog").attr({"role":"document"});
        let modalContent = $("<div>").addClass("modal-content");
        let modalHeader = $("<div>").addClass("modal-header");
        let modalBody = $("<div>").addClass("modal-body");
        let modalFooter = $("<div>").addClass("modal-footer");
        
        let el = $("<h5>").addClass("modal-title").attr({"id":attrs.titleId}).html(attrs.titleText);
        modalHeader.append(el);
        modalContent.append(modalHeader);

        let form = $("<form>");
        let divFormGroup = $("<div>").addClass("form-group");
        el = $("<input>").attr({ "type": "hidden", "id":attrs.id });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.nome }).text("Nome");
        divFormGroup.append(el);
        el = $("<input>").addClass('user-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.nome });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": attrs.cognome }).text("Cognome");
        divFormGroup.append(el);
        el = $("<input>").addClass('user-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.cognome });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": attrs.username }).text("Nome utente");
        divFormGroup.append(el);
        el = $("<input>").addClass('user-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.username });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.password }).text("Password - In modifica lasciare vuota per non cambiarla");
        divFormGroup.append(el);
        el = $("<input>").addClass('user-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.password });
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("form-group");
        el = $("<label>").attr({ "for": attrs.email }).text("e-mail");
        divFormGroup.append(el);
        el = $("<input>").addClass('user-input-form').addClass("form-control").attr({ "type": "email", "id": attrs.email });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": attrs.roleId }).text("Ruolo");
        divFormGroup.append(el);
        el = $("<input>").addClass('user-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.roleId });
        divFormGroup.append(el);
    
        let div4 = $("<div>").addClass("col");
        if(attrs.hasOwnProperty('isActive')){
            el = $("<label>").attr({ "for": attrs.isActive }).text("Attivo");
            div4.append(el);
            el = $("<input>").addClass('user-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.isActive });
            div4.append(el);
        }
        let div5 = $("<div>").addClass("input-group-addon");
        el = $("<span>").addClass("glyphicon glyphicon-th");
        div5.append(el);
        div4.append(div5);
        divFormGroup.append(div4);
        
        
        form.append(divFormGroup);

        modalBody.append(form);
        modalContent.append(modalBody);

        el = $("<button>").addClass("btn").addClass("btn-primary").text("Conferma").attr({ "onClick": fun1 });
        modalFooter.append(el);
        el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({"onClick": fun2/*"data-dismiss":"modal"*/});
        modalFooter.append(el);
        modalContent.append(modalFooter);

        modalDialog.append(modalContent);
        modal.append(modalDialog);
    }
}

function cleanUserInsert() {
    $(".user-input-form").val('');
    $("#insertUser").fadeOut();
}