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
    $("#editIdUser").val();
    $("#editNomeUser").val(element.nome);
    $("#editCognomeUser").val(element.cognome);
    $("#editeUsernameUser").val(element.username);
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