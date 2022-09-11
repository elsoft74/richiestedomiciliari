function showRequests(richieste, user) {
    $("#main").html("");
    // $(".swabs-form").hide();
    // $(".users-form").hide();
    // $(".requests-form").show();
    // $("#users").html("");
    // $(".requests-form").show();
    // $(".users-form").hide();
    var mostraStorico = JSON.parse(localStorage.getItem("mostraStorico"));
    if(mostraStorico==null){
        mostraStorico = false;
    }

    var table = new Tabulator("#main", {
        data: richieste,           //load row data from array
        layout: "fitData",      //fit columns to width of table
        responsiveLayout: "collapse",  //hide columns that dont fit on the table
        //tooltips: true,            //show tool tips on cells
        addRowPos: "top",          //when adding a new row, add it to the top of the table
        history: true,             //allow undo and redo actions on the table
        pagination: "local",       //paginate the data
        paginationSize: 12,         //allow 7 rows per page of data
        paginationCounter: "rows", //display count of paginated rows in footer
        movableColumns: true,      //allow column order to be changed
        // initialSort: [             //set the initial sort order of the data
        //     { column: "dataRic", dir: "asc" },
        // ],
        downloadConfig: {
            columnHeaders: true, //do not include column headers in downloaded table
            columnGroups: false, //do not include column groups in column headers for downloaded table
            rowGroups: false, //do not include row groups in downloaded table
            columnCalcs: false, //do not include column calcs in downloaded table
            dataTree: false, //do not include data tree in downloaded table
        },
        columns: [                 //define the table columns


            {
                title: "Programmata per:", field: "data", editor: false, hozAlign: "center", formatter: "datetime", formatterParams: {
                    //inputFormat:"YYY-MM-DD HH:mm:ss",
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "(data non valida)",
                    timezone: "Europe/Rome",
                }
            },

            { title: "#", field: "idAssistito", width: 10, editor: false, hozAlign: "center", visible: checkUserPermission(user, "canViewId") },
            {
                columns: [
                    {
                        title: "", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canEditAssistito"), cellClick: checkUserPermission(user, "canEditAssistito") ? showAssistitoUpdate : null, formatter: function (cell, formatterParams, onRendered) {

                            return '<span class="material-symbols-outlined" style="color: green">edit</span>';
                        }, headerSort: false
                    },
                    {
                        title: "", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canDeleteAssistito"), cellClick: checkUserPermission(user, "canDeleteAssistito") ? deleteElement : null, formatter: function (cell, formatterParams, onRendered) {

                            return '<span class="material-symbols-outlined" style="color: red">delete</span>';
                        }, headerSort: false
                    },
                ]
            },

            { title: "Cognome", field: "cognome", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Nome", field: "nome", editor: false },
            {
                title: "Nascita", field: "nascita", editor: false, formatter: "datetime", formatterParams: {
                    //inputFormat:"YYY-MM-DD HH:mm:ss",
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "(data non valida)",
                    timezone: "Europe/Rome",
                }
            },
            { title: "Codice Fiscale", field: "codiceFiscale", editor: false, hozAlign: "center", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Telefono", field: "telefono", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "e-mail", field: "email", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Indirizzo", field: "indirizzo", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            // (checkUserPermission(user, "canViewAllRequests")) ?
            {
                title: "Usca", field: "usca", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },
            {
                title: "Note", field: "noteAssistito", editor: false, cellClick: cellPopupFormatterNoteAssistito, formatter: function (cell, formatterParams, onRendered) {
                    return (cell.getValue() == null) ? '' : '<span class="material-symbols-outlined">notes</span>';
                }, headerSort: false
            },
            {
                columns:[
                    {
                        title: "", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canCreateRequest"), cellClick: checkUserPermission(user, "canCreateRequest") ? newRequest : null, formatter: function (cell, formatterParams, onRendered) {
        
                            return '<span class="material-symbols-outlined" style="color: green">add</span>';
                        }, headerSort: false
                    },
                    {
                        title: "", field: "idRichiesta", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canEditRequest"), cellClick: checkUserPermission(user, "canEditRequest") ? showElementUpdate : null, formatter: function (cell, formatterParams, onRendered) {
                            return (cell.getValue() == null) ? '' : '<span class="material-symbols-outlined" style="color: green">edit</span>';
                        }, headerSort: false
                    },
                    {
                        title: "", field: "idRichiesta", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canDeleteRequest"), cellClick: checkUserPermission(user, "canEditRequest") ? deleteElement : null, formatter: function (cell, formatterParams, onRendered) {
                            return (cell.getValue() == null) ? '' : '<span class="material-symbols-outlined" style="color: red">delete</span>';
                        }, headerSort: false
                    },
                    {
                        title: "", field: "isArchived", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canArchiveRequest"), cellClick: checkUserPermission(user, "canEditRequest") ? archiveElement : null, formatter: function (cell, formatterParams, onRendered) {
                            return (cell.getValue()) ? '' : '<span class="material-symbols-outlined" style="color: green">inventory_2</span>';
                        }, headerSort: false
                    },
                ]
            },
            {
                columns: [
                    { title: "#", field: "idRichiesta", editor: false, hozAlign: "center", visible: checkUserPermission(user, "canViewId") },
                    {
                        title: "", field: "idTipologia", editor: false, visible: false
                    },
                    {
                        title: "", field: "idPriorita", editor: false, visible: false
                    },
                    {
                        title: "idUsca", field: "idUsca", visible: false
                    },
                ]
            },

            {
                title: "Tipo", field: "tipologia", editor: false, hozAlign: "center", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },
            {
                title: "Priorità", field: "priorita", editor: false, hozAlign: "center", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },

            {
                title: "Note", field: "noteRichiesta", editor: false/*, formatter: "textarea" */, cellClick: cellPopupFormatterNoteRichiesta, formatter: function (cell, formatterParams, onRendered) {
                    return (cell.getValue() == null) ? '' : '<span class="material-symbols-outlined">notes</span>';
                }, headerSort: false
            },
            (mostraStorico)?{title: "Archiviata", field: "isArchived", editor: false, formatter: "textarea", hozAlign: "center", formatter: function (cell, formatterParams, onRendered) {
                return (cell.getValue()) ? 'S' : 'N';
            }, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"}:{ visible: false },
            // (checkUserPermission(user, "canViewDetails")) ?
            //     {
            //         title: "Dettagli", editor: false/*, formatter: "textarea" */, cellClick: cellPopupFormatterDettagliRichiesta, formatter: function (cell, formatterParams, onRendered) {
            //             return (cell.getValue() == null) ? '' : '<span class="material-symbols-outlined">edit</span>';
            //         }
            //     } : { visible: false },
        ]
    });

    if (checkUserPermission(user, "canExport")) {
        let button = $("<button>").addClass("btn btn-primary btn-block requests-form").attr({ "id": "dataDownLoadButton" }).html("Scarica richieste");
        $("#menubuttons").append(button);
        document.getElementById("dataDownLoadButton").addEventListener("click", function () {
            table.download("xlsx", "richieste.xlsx", { sheetName: "Export" });
        });
    }
    setTimeout(checkNewData, 200);

}

function inserisci() {
    let lu = localStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        let richiesta = {};
        loggedUser = JSON.parse(lu);
        let username = loggedUser.username;
        let token = "123456";
        richiesta.idAssistito = $("#idAssistito").val();
        richiesta.idTipologia = $("#idTipologia").val();
        richiesta.idPriorita = $("#idPriorita").val();
        richiesta.data = $("#data").val();
        richiesta.note = $("#noteRichiesta").val().trim();
        richiesta.createdBy = "" + loggedUser.id;

        let err = checkDatiObbligatori(richiesta);

        if (err != '') {
            Swal.fire({
                text: err,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            })
        } else {
            let xhr = new XMLHttpRequest();
            let url = "be/insertRequest.php";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    result = JSON.parse(xhr.responseText);
                    if (result.status == "OK") {
                        Swal.fire({
                            text: "Operazione completata.",
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                cleanInsert();
                                location.reload();
                            }
                        })
                    } else {
                        Swal.fire({
                            text: "Impossibile completare l'operazione",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        })
                    }
                }
            }
            xhr.send("username=" + username + "&token=" + token + "&richiesta=" + JSON.stringify(richiesta));
        }
    }
}

function aggiorna() {
    let lu = localStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        loggedUser = JSON.parse(lu);
        let username = loggedUser.username;
        let token = "123456";
        let richiesta = {};
        richiesta.id = $("#idRichiestaEdit").val();
        richiesta.idTipologia = $("#idTipologiaEdit").val();
        richiesta.idPriorita = $("#idPrioritaEdit").val();
        richiesta.data = $("#dataEdit").val();
        richiesta.note = $("#noteRichiestaEdit").val();
        richiesta.lastUpdateBy = "" + loggedUser.id;

        let err = checkDatiObbligatori(richiesta);

        if (err != '') {
            Swal.fire({
                text: err,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            })
        } else {

            let xhr = new XMLHttpRequest();
            let url = "be/updateRequest.php";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    result = JSON.parse(xhr.responseText);
                    if (result.status == "OK") {
                        Swal.fire({
                            text: "Operazione completata.",
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                cleanEdit();
                                location.reload();
                            }
                        })
                    } else {
                        Swal.fire({
                            text: "Impossibile completare l'operazione",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        })
                    }
                }
            }
            xhr.send("username=" + username + "&token=" + token + "&richiesta=" + JSON.stringify(richiesta));
        }
    }
}

var showElementUpdate = function (e, row) {
    $("#edit").show();
    var element = row.getData();
    $("#idAssistitoEdito").val(element.idAssistito);
    $("#nomeEdit").val(element.nome);
    $("#cognomeEdit").val(element.cognome);
    $("#emailEdit").val(element.email);
    $("#indirizzoEdit").val(element.indirizzo);
    $("#codiceFiscaleEdit").val(element.codiceFiscale);
    $("#noteAssistitoEdit").val(element.noteAssistito);
    $("#telefonoEdit").val(element.telefono);
    $("#idRichiestaEdit").val(element.idRichiesta);
    $("#idTipologiaEdit").val(element.idTipologia);
    $("#idPrioritaEdit").val(element.idPriorita);
    $("#dataEdit").val(((new luxon.DateTime.fromSQL(element.data)).toFormat("yyyy-MM-dd")));
    $("#noteRichiestaEdit").val(element.noteRichiesta);
}

var deleteElement = function (e, row) {
    var element = row.getData();
    Swal.fire({
        title: 'Sicuro?',
        text: "Confermando cancellerai la scheda con id " + element.idRichiesta + " di:" + element.nome + " " + element.cognome + "\n" + element.codiceFiscale + "\n" + "Prevista per il:" + element.data,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annulla',
        confirmButtonText: 'Conferma'
    }).then((result) => {
        if (result.isConfirmed) {
            let lu = localStorage.getItem("ricdomloggeduser");
            if (lu != null) {
                loggedUser = JSON.parse(lu);
                let username = loggedUser.username;
                let token = "123456";
                let richiesta = {};
                richiesta.id = element.idRichiesta;
                richiesta.deletedBy = "" + loggedUser.id;

                let xhr = new XMLHttpRequest();
                let url = "be/deleteRequest.php";
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                    result = JSON.parse(xhr.responseText);
                    if (result.status == "OK") {
                        Swal.fire({
                            text: "Operazione completata.",
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        })
                    } else {
                        Swal.fire({
                            text: "Impossibile completare l'operazione",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        })
                    }
                }
                xhr.send("username=" + username + "&token=" + token + "&richiesta=" + JSON.stringify(richiesta));
            }
        }

    })
}

var archiveElement = function (e, row) {
    var element = row.getData();
    Swal.fire({
        title: 'Sicuro?',
        text: "Confermando archivierai la scheda con id " + element.idRichiesta + " di:" + element.nome + " " + element.cognome + "\n" + element.codiceFiscale + "\n" + "Prevista per il:" + element.data,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annulla',
        confirmButtonText: 'Conferma'
    }).then((result) => {
        if (result.isConfirmed) {
            let lu = localStorage.getItem("ricdomloggeduser");
            if (lu != null) {
                loggedUser = JSON.parse(lu);
                let username = loggedUser.username;
                let token = "123456";
                let richiesta = {};
                richiesta.id = element.idRichiesta;
                richiesta.archivedBy = "" + loggedUser.id;

                let xhr = new XMLHttpRequest();
                let url = "be/archiveRequest.php";
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                    result = JSON.parse(xhr.responseText);
                    if (result.status == "OK") {
                        Swal.fire({
                            text: "Operazione completata.",
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        })
                    } else {
                        Swal.fire({
                            text: "Impossibile completare l'operazione",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        })
                    }
                }
                xhr.send("username=" + username + "&token=" + token + "&richiesta=" + JSON.stringify(richiesta));
            }
        }

    })
}

function readRequests(toBeCompleted) {
    var table = Tabulator.findTable("#main")[0];
    var rowCount = 0;
    if (table != null && table != undefined) {
        rowCount = table.getDataCount();
    }
    if (rowCount == 0) {
        localStorage.setItem("lastRead", null);
    }
    let xhr = new XMLHttpRequest();
    let url = "be/getrequests.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let ready = false;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                richieste = result.data;
                toBeCompleted.richieste = true;
                if (result.hasOwnProperty("lastRead")) {
                    localStorage.setItem("lastRead", result.lastRead);
                }
                if (result.hasOwnProperty("deleted")) {
                    localStorage.setItem("deleted", result.deleted);
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
    xhr.send("lastRead=" + localStorage.getItem("lastRead"));
}

//create header popup contents
var headerPopupFormatter = function (e, column, onRendered) {
    var container = document.createElement("div");

    var label = document.createElement("label");
    label.innerHTML = "Filter Column:";
    label.style.display = "block";
    label.style.fontSize = ".7em";

    var input = document.createElement("input");
    input.placeholder = "Filter Column...";
    input.value = column.getHeaderFilterValue() || "";

    input.addEventListener("keyup", (e) => {
        column.setHeaderFilterValue(input.value);
    });

    container.appendChild(label);
    container.appendChild(input);

    return container;
}

//create dummy header filter to allow popup to filter
var emptyHeaderFilter = function () {
    return document.createElement("div");;
}

var cellPopupFormatterNoteAssistito = function (e, row, onRendered) {
    var data = row.getData();
    cellPopupFormatter(data.noteAssistito);
};

var cellPopupFormatterNoteRichiesta = function (e, row, onRendered) {
    var data = row.getData();
    cellPopupFormatter(data.noteRichiesta);
};


var cellPopupFormatter = function (title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
    })
};

function checkDatiObbligatori(richiesta) {
    let out = '';
    if (richiesta.data == null) {
        out += "La data è obbligatoria\n";
    }
    return out;
}

function checkAndShowMessage(result) {
    if (result.status == "OK") {
        Swal.fire({
            text: "Operazione completata.",
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                cleanEdit();
                //location.reload();
            }
        })
    } else {
        Swal.fire({
            text: "Impossibile completare l'operazione",
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        })
    }
}

var newRequest = function (e, row) {
    var element = row.getData();
    $("#idAssistito").val(element.idAssistito);
    $("#nome").val(element.nome);
    $("#cognome").val(element.cognome);
    $("#email").val(element.email);
    $("#indirizzo").val(element.indirizzo);
    $("#codiceFiscale").val(element.codiceFiscale);
    $("#noteAssistito").val(element.noteAssistito);
    $("#telefono").val(element.telefono);
    $("#insert").show();

}


var cellPopupFormatterDettagliRichiesta = function (e, row) {
    var element = row.getData();
    Swal.fire({
        html: "<p>Scheda creata il: " + element.created + " da " + element.createdByNomeCognome + "</p>" + ((element.lastUpdate != null) ? "<p>Modificata il: " + element.lastUpdate + " da " + element.lastUpdateByNomeCognome + "</p>" : ""),
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
    });
}

var showArchived = function (e,row){
    var element = row.getData();
    console.log(element.idRichiesta+":"+element.isArchived);

    return (element.idRichiesta !=null && element.isArchived);
}


function updateTableData() {
    var table = Tabulator.findTable("#main")[0];
    waitingForData = true;
    if (table != null || table != undefined) {
        console.log("Scrivo i dati aggiornati");
        if (!waitingForData) {
            toBeCompleted.richieste = false;
            readRequests(toBeCompleted);
            setTimeout(updateTableData, 200);
        }
        if (toBeCompleted.richieste) {
            waitingForData = false;
            table.updateOrAddData(richieste);
            var deleted = localStorage.getItem("deleted");
            if (deleted != null || deleted != undefined) {
                table.deleteRow(deleted);
                localStorage.removeItem("deleted");
            }
        } else {

        }
        setTimeout(checkNewData, 200);
    }
}