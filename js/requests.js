function showRequests(richieste, user) {
    $("#main").html("");
    var mostraStorico = JSON.parse(sessionStorage.getItem("mostraStorico"));
    if (mostraStorico == null) {
        mostraStorico = false;
    }
    
    var table = new Tabulator("#main", {
        height: 800,
        data: richieste,           //load row data from array
        layout: "fitColumns",      //fit columns to width of table
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
                title: "Programmata", width: 150, field: "data", editor: false, hozAlign: "center", vertAlign: "middle", formatter: "datetime", formatterParams: {
                    //inputFormat:"YYY-MM-DD HH:mm:ss",
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "(data non valida)",
                    timezone: "Europe/Rome",
                }, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },
            {
                title: "Tipo", width: 120, field: "tipologia", editor: false, hozAlign: "center", vertAlign: "middle", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },
            {
                title: "Priorità", width: 120, field: "priorita", editor: false, hozAlign: "center", vertAlign: "middle", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },
            (mostraStorico) ? {
                title: "Arch.", width: 120, field: "archived", editor: false, formatter: "textarea", hozAlign: "center", vertAlign: "middle", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            } : { visible: false },

            { title: "#", field: "idAssistito", width: 5, editor: false, hozAlign: "center", vertAlign: "middle", visible: checkUserPermission(user, "canViewId") },

            {
                title: "", width: 8, field: "noteAssistito", vertAlign: "middle", editor: false, cellClick: cellPopupFormatterNoteAssistito, formatter: function (cell, formatterParams, onRendered) {
                    return (cell.getValue() == null) ? '' : '<span class="material-icons-outlined">notes</span>';
                }, headerSort: false, tooltip: function (e, cell, onRendered) {
                    var el1 = document.createElement("div");
                    el1.style.backgroundColor = "#0d6efd";
                    var el2 = document.createElement("span");
                    el2.style.color = "#ffffff";
                    el2.innerText = "Note assistito";
                    el1.append(el2);
                    return el1;
                }
            },

            { title: "Cognome", width: 150, field: "cognome", vertAlign: "middle", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Nome", width: 150, field: "nome", vertAlign: "middle", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            {
                title: "Nascita", width: 100, field: "nascita", vertAlign: "middle", editor: false, formatter: "datetime", formatterParams: {
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "",
                    timezone: "Europe/Rome",
                }
            },
            { title: "Codice Fiscale", width: 150, field: "codiceFiscale", editor: false, hozAlign: "center", vertAlign: "middle", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Cont.1", field: "telefono1", visible: false },
            { title: "Cont.2", field: "telefono2", visible: false },
            { title: "Cont.3", field: "telefono3", visible: false },
            { title: "e-mail", field: "email", visible: false },
            {
                title: "Contatti", width: 150, field: "contatti", editor: false, hozAlign: "left", vertAlign: "middle", formatter: function (cell, formatterParams, onRendered) {
                    var out = "<div><ul>";
                    var val = cell.getValue();
                    contatti = JSON.parse(val);
                    contatti.forEach(el => {
                        if (el != "") {
                            out += "<li>" + el;
                        }
                    });
                    out += "</ul></div>";
                    return out;
                }
            },
            { title: "Indirizzo", field: "indirizzo", formatter: "textarea", vertAlign: "middle", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            {
                title: "Team", width: 120, field: "usca", vertAlign: "middle", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like", visible: !user.permissions.canChangeUsca
            },
            {
                title: "", width: 8, hozAlign: "center", vertAlign: "middle", editor: false, visible: checkUserPermission(user, "canCreateRequest"), cellClick: checkUserPermission(user, "canCreateRequest") ? newRequest : null, formatter: function (cell, formatterParams, onRendered) {

                    return '<span class="material-icons-outlined" style="color: green">add</span>';
                }, headerSort: false, tooltip: function (e, cell, onRendered) {
                    var el1 = document.createElement("div");
                    el1.style.backgroundColor = "#0d6efd";
                    var el2 = document.createElement("span");
                    el2.style.color = "#ffffff";
                    el2.innerText = "Aggiungi richiesta";
                    el1.append(el2);
                    return el1;
                }
            },
            {
                title: "", width: 8, field: "idRichiesta", width: 10, hozAlign: "center", vertAlign: "middle", editor: false, visible: checkUserPermission(user, "canEditRequest"), cellClick: checkUserPermission(user, "canEditRequest") ? showElementUpdate : null, formatter: function (cell, formatterParams, onRendered) {
                    return (cell.getValue() == null) ? '' : '<span class="material-icons-outlined" style="color: green">edit</span>';
                }, headerSort: false, tooltip: function (e, cell, onRendered) {
                    var el1 = document.createElement("div");
                    el1.style.backgroundColor = "#0d6efd";
                    var el2 = document.createElement("span");
                    el2.style.color = "#ffffff";
                    el2.innerText = "Modifica richiesta";
                    el1.append(el2);
                    return el1;
                }
            },
            {
                title: "", width: 8, field: "idRichiesta", width: 10, hozAlign: "center", vertAlign: "middle", editor: false, visible: checkUserPermission(user, "canDeleteRequest"), cellClick: checkUserPermission(user, "canEditRequest") ? deleteElement : null, formatter: function (cell, formatterParams, onRendered) {
                    return (cell.getValue() == null) ? '' : '<span class="material-icons-outlined" style="color: red">delete</span>';
                }, headerSort: false, tooltip: function (e, cell, onRendered) {
                    var el1 = document.createElement("div");
                    el1.style.backgroundColor = "red";
                    var el2 = document.createElement("span");
                    el2.style.color = "#ffffff";
                    el2.innerText = "Cancella richiesta";
                    el1.append(el2);
                    return el1;
                }
            },
            // {
            //     title: "", width: 8, field: "isArchived", width: 10, hozAlign: "center", vertAlign: "middle", editor: false, visible: checkUserPermission(user, "canArchiveRequest"), cellClick: checkUserPermission(user, "canEditRequest") ? archiveElement : null, formatter: function (cell, formatterParams, onRendered) {
            //         return (cell.getValue() != null) ? (cell.getValue() ? '<span class="material-icons-outlined" style="color: green">unarchive</span>' : '<span class="material-icons-outlined" style="color: green">archive</span>') : "";
            //     }, headerSort: false, tooltip: function (e, cell, onRendered) {
            //         var el1 = document.createElement("div");
            //         el1.style.backgroundColor = "#0d6efd";
            //         var el2 = document.createElement("span");
            //         el2.style.color = "#ffffff";
            //         el2.innerText = "Archiviazione/Ripristino richiesta";
            //         el1.append(el2);
            //         return el1;
            //     }
            // },
            // {
            //     title: "", width: 8, field: "noteRichiesta", vertAlign: "middle", editor: false/*, formatter: "textarea" */, cellClick: buildNoteRichiestaModal, formatter: function (cell, formatterParams, onRendered) {
            //         return (cell.getValue() == null) ? '' : '<span class="material-icons-outlined">notes</span>';
            //     }, headerSort: false, tooltip: function (e, cell, onRendered) {
            //         var el1 = document.createElement("div");
            //         el1.style.backgroundColor = "#0d6efd";
            //         var el2 = document.createElement("span");
            //         el2.style.color = "#ffffff";
            //         el2.innerText = "Note richiesta";
            //         el1.append(el2);
            //         return el1;
            //     }
            // },
            {
                columns: [
                    { title: "#", field: "idRichiesta", editor: false, hozAlign: "center", vertAlign: "middle", visible: checkUserPermission(user, "canViewId") },
                    {
                        title: "", field: "idTipologia", editor: false, visible: false
                    },
                    {
                        title: "", field: "idPriorita", editor: false, visible: false
                    },
                    {
                        title: "", field: "idUsca", visible: false
                    },
                    {
                        title: "", field: "statiAttuali", visible: false
                    },
                ]
            },

        ]
    });

    if (checkUserPermission(user, "canExport")) {
        let button = $("<button>").addClass("btn btn-primary btn-block requests-form").attr({ "id": "dataDownLoadButton" }).html("Scarica elenco attività").hide();
        $("#menubuttons").append(button);
        document.getElementById("dataDownLoadButton").addEventListener("click", function () {
            table.download("xlsx", "richieste.xlsx", { sheetName: "Export" });
        });
    }
    $("#main").hide();
    setTimeout(checkNewData, 2000);

}

function inserisci() {
    var lu = sessionStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        var richiesta = {};
        loggedUser = JSON.parse(lu);
        var username = loggedUser.username;
        var token = "123456";
        richiesta.id = $("#idRichiesta").val();
        richiesta.idAssistito = $("#idAssistito").val();
        richiesta.idTipologia = $("#idTipologia").val();
        richiesta.idPriorita = $("#idPriorita").val();
        richiesta.data = $("#data").val();
        var assistito = {};
        assistito.id = richiesta.idAssistito;
        assistito.nome = $("#nome").val().trim();
        assistito.cognome = $("#cognome").val().trim();
        assistito.nascita = $("#nascita").val();
        assistito.codiceFiscale = $("#codiceFiscale").val().trim();
        assistito.telefono1 = $("#telefono1").val().trim();
        assistito.telefono2 = $("#telefono2").val().trim();
        assistito.telefono3 = $("#telefono3").val().trim();
        assistito.email = $("#email").val().trim();
        assistito.idUsca = $("#idUsca").val();
        richiesta.idUsca = $("#idUsca").val();
        assistito.note = $("#noteAssistito").val().trim();
        assistito.indirizzo = $("#indirizzo").val().trim();
        richiesta.assistito=assistito;
        richiesta.isArchived = false;
        var actualNotes = [];
        if ($("#noteRichiestaAttuali").val()!=""){
            actualNotes = JSON.parse($("#noteRichiestaAttuali").val());
        }
        var newNoteText = $("#nuovaNotaRichiesta").val().trim();
        if (newNoteText != "") {
            var newNoteDate = (new luxon.DateTime.fromJSDate(new Date())).toFormat("yyyy-MM-dd HH:mm:ss");
            var newNoteObject = {};
            newNoteObject.date = newNoteDate,
            newNoteObject.note = newNoteText;
            newNoteObject.createdBy = loggedUser.id;
            actualNotes.push(newNoteObject);
        }
        richiesta.note = JSON.stringify(actualNotes);
        if ($("#actionType").val()=="insert"){
            richiesta.createdBy = "" + loggedUser.id;
        } else {
            richiesta.lastUpdateBy = "" + loggedUser.id;
        }
        if ($("#isArchived").val()!=undefined && JSON.parse($("#isArchived").val())){
            richiesta.isArchived = true;
            richiesta.archivedBy = "" + loggedUser.id;
        }
        richiesta.nuoviStati=[];
        var nuoviStati = $("input[name='nuoviStati']:checked");
        for (var i=0; i<nuoviStati.length;i++){
            let tmp=$(nuoviStati[i]);
            richiesta.nuoviStati.push(tmp.val());
        }

        var err = checkDatiObbligatori(richiesta);

        if (err != '') {
            Swal.fire({
                html: err,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            })
        } else {
            var xhr = new XMLHttpRequest();
            var url = ($("#actionType").val()=="insert")?"be/insertRequest.php":"be/updateRequest.php";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var result = JSON.parse(xhr.responseText);
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

// function aggiorna() {
//     var lu = sessionStorage.getItem("ricdomloggeduser");
//     if (lu != null) {
//         loggedUser = JSON.parse(lu);
//         var username = loggedUser.username;
//         var token = "123456";
//         var richiesta = {};

//         var actualNotes = [];
//         if ($("#noteRichiestaAttuali").val()!=undefined){
//             JSON.parse($("#noteRichiestaAttuali").val());
//         }
//         var newNoteText = $("#nuovaNotaRichiesta").val();
//         if (newNoteText.trim() != "") {
//             var newNoteDate = (new luxon.DateTime.fromJSDate(new Date())).toFormat("yyyy-MM-dd HH:mm:ss");
//             var newNoteObject = {};
//             newNoteObject.date = newNoteDate,
//             newNoteObject.note = newNoteText;
//             newNoteObject.createdBy = loggedUser.id;
//             actualNotes.push(newNoteObject);
//         }
//         richiesta.note = actualNotes;
//         richiesta.id = $("#idRichiestaEdit").val();
//         richiesta.idTipologia = $("#idTipologiaEdit").val();
//         richiesta.idPriorita = $("#idPrioritaEdit").val();
//         richiesta.data = $("#dataEdit").val();
//         richiesta.lastUpdateBy = "" + loggedUser.id;
//         if ($("#isArchived").val()!=undefined && JSON.parse($("#isArchived").val())){
//             richiesta.isArchived = true;
//             richiesta.archivedBy = "" + loggedUser.id;
//         }
//         richiesta.nuoviStati=[];
//         var nuoviStati = $("input[name='nuoviStati']:checked");
//         for (var i=0; i<nuoviStati.length;i++){
//             let tmp=$(nuoviStati[i]);
//             richiesta.nuoviStati.push(tmp.val());
//         }
//         var assistito = {};
//         assistito.id = richiesta.idAssistito;
//         assistito.nome = $("#nome").val().trim();
//         assistito.cognome = $("#cognome").val().trim();
//         assistito.codiceFiscale = $("#codiceFiscale").val().trim();
//         assistito.telefono1 = $("#telefono1").val().trim();
//         assistito.telefono2 = $("#telefono2").val().trim();
//         assistito.telefono3 = $("#telefono3").val().trim();
//         assistito.email = $("#email").val().trim();
//         assistito.idUsca = $("#idUsca").val();
//         richiesta.assistito=assistito;

//         var err = checkDatiObbligatori(richiesta);

//         if (err != '') {
//             Swal.fire({
//                 html: err,
//                 icon: 'error',
//                 showCancelButton: false,
//                 confirmButtonColor: '#3085d6',
//                 confirmButtonText: 'Ok'
//             })
//         } else {

//             var xhr = new XMLHttpRequest();
//             var url = "be/updateRequest.php";
//             xhr.open("POST", url, true);
//             xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4 && xhr.status === 200) {
//                     var result = JSON.parse(xhr.responseText);
//                     if (result.status == "OK") {
//                         Swal.fire({
//                             text: "Operazione completata.",
//                             icon: 'info',
//                             showCancelButton: false,
//                             confirmButtonColor: '#3085d6',
//                             confirmButtonText: 'Ok'
//                         }).then((result) => {
//                             if (result.isConfirmed) {
//                                 cleanEdit();
//                             }
//                         })
//                     } else {
//                         Swal.fire({
//                             text: "Impossibile completare l'operazione",
//                             icon: 'error',
//                             showCancelButton: false,
//                             confirmButtonColor: '#3085d6',
//                             confirmButtonText: 'Ok'
//                         })
//                     }
//                 }
//             }
//             xhr.send("username=" + username + "&token=" + token + "&richiesta=" + JSON.stringify(richiesta));
//         }
//     }
// }

var showElementUpdate = function (e, row) {
    var element = row.getData();
    $("#idRichiesta").val(element.idRichiesta);
    $("#idAssistito").val(element.idAssistito);
    $("#nome").val(element.nome);
    $("#cognome").val(element.cognome);
    $("#email").val(element.email);
    $("#codiceFiscale").val(element.codiceFiscale);
    $("#indirizzo").val(element.indirizzo);
    $("#noteAssistito").val(element.noteAssistito);
    $("#telefono1").val(element.telefono1);
    $("#telefono2").val(element.telefono2);
    $("#telefono3").val(element.telefono3);
    $("#idTipologia").val(element.idTipologia);
    $("#idPriorita").val(element.idPriorita);
    $("#idUsca").val(element.idUsca);
    $("#noteRichiestaAttuali").val(element.noteRichiesta);
    $("#data").val(((new luxon.DateTime.fromSQL(element.data)).toFormat("yyyy-MM-dd")));
    $("#actionType").val("update");
    $("#insertFormButton1").attr({"onClick":"inserisci()"});
    $("#insertFormButton2").attr({"onClick":"cleanInsert()"});
    $("#nascita").val(((new luxon.DateTime.fromSQL(element.nascita)).toFormat("yyyy-MM-dd"))); 
    if (JSON.parse(element.noteRichiesta).length > 0) {
        var table = new Tabulator("#noteRichiesta", {
            height: 170,
            data: element.noteRichiesta,           //load row data from array
            layout: "fitColumns",      //fit columns to width of table
            responsiveLayout: "collapse",  //hide columns that dont fit on the table
            addRowPos: "top",          //when adding a new row, add it to the top of the table
            history: true,             //allow undo and redo actions on the table
            pagination: "local",       //paginate the data
            paginationSize: 12,         //allow 7 rows per page of data
            paginationCounter: "rows", //display count of paginated rows in footer
            movableColumns: true,      //allow column order to be changed
            columns: [                 //define the table columns
                {
                    title: "Data", width: 120, field: "date", editor: false, hozAlign: "center", vertAlign: "middle", formatter: "datetime", formatterParams: {
                        outputFormat: "dd-MM-yyyy",
                        invalidPlaceholder: "(data non valida)",
                        timezone: "Europe/Rome",
                    }, headerPopup: headerPopupFormatter,
                },

                {
                    title: "Nota", field: "note", editor: false, hozAlign: "center", vertAlign: "middle", cellClick: mostraNotaEstesa, tooltip: function (e, cell, onRendered) {
                        var el1 = document.createElement("div");
                        el1.style.backgroundColor = "#0d6efd";
                        var el2 = document.createElement("span");
                        el2.style.color = "#ffffff";
                        el2.innerText = "Leggi tutto";
                        el1.append(el2);
                        return el1;
                    }
                },
            ]
        });
    } else {
        $("#noteRichiesta").parent().hide();
    }
    if (JSON.parse(element.statiAttuali).length > 0) {
        var table = new Tabulator("#statiAttuali", {
            height: 170,
            data: element.statiAttuali,           //load row data from array
            layout: "fitColumns",      //fit columns to width of table
            responsiveLayout: "collapse",  //hide columns that dont fit on the table
            addRowPos: "top",          //when adding a new row, add it to the top of the table
            history: true,             //allow undo and redo actions on the table
            pagination: "local",       //paginate the data
            paginationSize: 12,         //allow 7 rows per page of data
            paginationCounter: "rows", //display count of paginated rows in footer
            movableColumns: true,      //allow column order to be changed
            columns: [                 //define the table columns
                {
                    title: "Data", width: 120, field: "date", editor: false, hozAlign: "center", vertAlign: "middle", formatter: "datetime", formatterParams: {
                        outputFormat: "dd-MM-yyyy",
                        invalidPlaceholder: "(data non valida)",
                        timezone: "Europe/Rome",
                    }, headerPopup: headerPopupFormatter,
                },

                {
                    title: "Attività svolte", field: "descrizione", editor: false, hozAlign: "center", vertAlign: "middle", cellClick: mostraNotaEstesa, tooltip: function (e, cell, onRendered) {
                        var el1 = document.createElement("div");
                        el1.style.backgroundColor = "#0d6efd";
                        var el2 = document.createElement("span");
                        el2.style.color = "#ffffff";
                        el2.innerText = "Leggi tutto";
                        el1.append(el2);
                        return el1;
                    }
                },
            ]
        });
    } else {
        $("#statiAttuali").parent().hide();
    }
    $(".note").hide();
    $("#insert").modal("show");
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
            var lu = sessionStorage.getItem("ricdomloggeduser");
            if (lu != null) {
                loggedUser = JSON.parse(lu);
                var username = loggedUser.username;
                var token = "123456";
                var richiesta = {};
                richiesta.id = element.idRichiesta;
                richiesta.deletedBy = "" + loggedUser.id;

                var xhr = new XMLHttpRequest();
                var url = "be/deleteRequest.php";
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                    var result = JSON.parse(xhr.responseText);
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
    var xhr = new XMLHttpRequest();
    var url = "be/getrequests.php";
    var activeUsca = sessionStorage.getItem("activeUsca");
    if (activeUsca == null) {
        activeUsca = "ALL";
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                var richieste = result.data;
                toBeCompleted.richieste = true;
                if (result.hasOwnProperty("lastRead")) {
                    sessionStorage.setItem("lastRead", result.lastRead);
                }
                sessionStorage.setItem("richieste", JSON.stringify(richieste));
                sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
                setTimeout(checkIfUpdated, 1000);
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
    xhr.send("lastRead=" + sessionStorage.getItem("lastRead") + "&activeUsca=" + activeUsca);
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
    cellPopupFormatter(data.hasOwnProperty("noteAssistito") ? data.noteAssistito : data.note);
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
    if (richiesta.data == null || richiesta.data == "") {
        out += "<p>La data è obbligatoria</p>";
    }
    if (richiesta.assistito.idUsca == null){
        out += "<p>Non è selezionato alcun Team</p>";
    }
    if (richiesta.nuoviStati.length==0){
        out += "<p>Non hai selezionato alcun nuovo stato per questa attività</p>";
    }
    return out;
}

// function checkAndShowMessage(result) {
//     if (result.status == "OK") {
//         Swal.fire({
//             text: "Operazione completata.",
//             icon: 'info',
//             showCancelButton: false,
//             confirmButtonColor: '#3085d6',
//             confirmButtonText: 'Ok'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 cleanEdit();
//             }
//         })
//     } else {
//         Swal.fire({
//             text: "Impossibile completare l'operazione",
//             icon: 'error',
//             showCancelButton: false,
//             confirmButtonColor: '#3085d6',
//             confirmButtonText: 'Ok'
//         })
//     }
// }

var newRequest = function (e, row) {
    var element = row.getData();
    $("#idAssistito").val((element.hasOwnProperty("idAssistito")) ? element.idAssistito : element.id);
    $("#nome").val(element.nome);
    $("#cognome").val(element.cognome);
    $("#email").val(element.email);
    $("#codiceFiscale").val(element.codiceFiscale);
    $("#indirizzo").val(element.indirizzo);
    $("#noteAssistito").val(element.noteAssistito);
    $("#telefono1").val(element.telefono1);
    $("#telefono2").val(element.telefono2);
    $("#telefono3").val(element.telefono3);
    $("#idPriorita").val("");
    $("#idTipologia").val("")
    $("#idUsca").val(element.idUsca);
    $("#statiAttuali").parent().hide();
    $("#noteRichiesta").parent().hide();
    $("#data").val((new luxon.DateTime.fromJSDate(new Date())).toFormat("yyyy-MM-dd"));
    $("#nascita").val(((new luxon.DateTime.fromSQL(element.nascita)).toFormat("yyyy-MM-dd")));
    $("#mostraNoteButton").hide();
    
    $("#actionType").val("insert");
    $("#insertFormButton1").attr({"onClick":"inserisci()"});
    $("#insertFormButton2").attr({"onClick":"cleanInsert()"});  
    $("#insert").modal("show");
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

var mostraNotaEstesa = function (e, row) {
    var element = row.getData();
    Swal.fire({
        html: "<div>" + element.note + "</div>",
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
    });
}


function updateRequestData() {
    var waitingForData = JSON.parse(sessionStorage.getItem("waitingForData"));
    var toBeCompleted = JSON.parse(sessionStorage.getItem("toBeCompleted"));
    if (waitingForData != null && !waitingForData) {
        waitingForData = true;
        toBeCompleted.richieste = false;
        sessionStorage.setItem("waitingForData", JSON.stringify(waitingForData));
        sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
        readRequests(toBeCompleted);
        setTimeout(updateRequestData, 1000);
    } else {
        if (toBeCompleted.richieste) {
            waitingForData = false;
            sessionStorage.setItem("waitingForData", JSON.stringify(waitingForData));
            var table = Tabulator.findTable("#main")[0];
            if (table != null && table != undefined) {
                var richieste = JSON.parse(sessionStorage.getItem("richieste"));
                table.updateOrAddData(richieste).then(function () {
                    setTimeout(checkNewData, 2000);
                })
            }
        } else {
            setTimeout(updateRequestData, 1000);
        }
    }
}

// var buildNoteRichiestaModal = function (e, row) {
//     var data = row.getData();
//     var noteRichiesta = null;
//     try {
//         noteRichiesta = JSON.parse(data.noteRichiesta);
//     } catch {
//         noteRichiesta = (data.noteRichiesta != null && data.noteRichiesta != "") ? [{ "date": "1970-01-01", "nota": data.noteRichiesta }] : [];
//     }
//     $("#modalNoteRichiesta").html("");
//     var modal = $("#modalNoteRichiesta").addClass("modal")/*.addClass("fade")*/.attr({ "tabindex": "-1", "role": "dialog", "aria-hidden": "true" });
//     var modalDialog = $("<div>").addClass("modal-dialog").attr({ "role": "document" });
//     var modalContent = $("<div>").addClass("modal-content");
//     var modalHeader = $("<div>").addClass("modal-header");
//     var modalBody = $("<div>").addClass("modal-body");
//     var modalFooter = $("<div>").addClass("modal-footer");

//     var el = $("<h5>").addClass("modal-title").html("Note richiesta");
//     modalHeader.append(el);
//     modalContent.append(modalHeader);

//     var form = $("<form>");
//     var div1 = $("<div>");
//     el = $("<input>").attr({ "type": "hidden", "id": "idRichiestaNuovaNota" }).val(data.idRichiesta);
//     form.append(el);
//     el = $("<input>").attr({ "type": "hidden", "id": "noteRichiestaAttuali" }).val(JSON.stringify(noteRichiesta));
//     form.append(el);
//     var div3 = $("<div>").addClass("col").attr({ "id": "elencoNote" });
//     form.append(div3);
//     div3 = $("<div>").addClass("col").attr({ "id": "nuovaNota" });
//     var div4 = $("<div>").addClass("col").addClass("date");
//     el = $("<label>").text("Data Nota").attr({ "for": "nuovaNotaDate" });
//     div4.append(el);
//     el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "date", "id": "nuovaNotaDate" });
//     div4.append(el);
//     var div5 = $("<div>").addClass("input-group-addon");
//     el = $("<span>").addClass("glyphicon glyphicon-th");
//     div5.append(el);
//     div4.append(div5);
//     div5 = $("<div>").addClass("form-group");
//     el = $("<label>").text("Data Nota").attr({ "for": "nuovaNotaText" });
//     div5.append(el);
//     el = $("<textarea>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": "nuovaNotaText" });
//     div5.append(el);
//     el = $("<button>").addClass("btn").addClass("btn-primary").text("Salva").attr({ "id": "salvaNotaButton", "onClick": "salvaNote()" });
//     div5.append(el);
//     div4.append(div5);
//     div3.append(div4);
//     form.append(div3);
//     div1.append(form);
//     el = $("<button>").addClass("btn").addClass("btn-primary").text("Aggiungi nota").attr({ "id": "aggiungiNotaButton", "onClick": 'mostraFormNuovaNota()' });
//     div1.append(el);


//     modalBody.append(div1);
//     modalContent.append(modalBody);

//     el = $("<button>").addClass("btn").addClass("btn-primary").text("Chiudi").attr({ "onClick": '$("#modalNoteRichiesta").hide()' });
//     modalFooter.append(el);
//     modalContent.append(modalFooter);

//     modalDialog.append(modalContent);
//     modal.append(modalDialog);
//     var table = new Tabulator("#elencoNote", {
//         data: noteRichiesta,           //load row data from array
//         layout: "fitColumns",      //fit columns to width of table
//         responsiveLayout: "collapse",  //hide columns that dont fit on the table
//         addRowPos: "top",          //when adding a new row, add it to the top of the table
//         history: true,             //allow undo and redo actions on the table
//         pagination: "local",       //paginate the data
//         paginationSize: 12,         //allow 7 rows per page of data
//         paginationCounter: "rows", //display count of paginated rows in footer
//         movableColumns: true,      //allow column order to be changed
//         columns: [                 //define the table columns
//             {
//                 title: "Data", width: 120, field: "date", editor: false, hozAlign: "center", vertAlign: "middle", formatter: "datetime", formatterParams: {
//                     outputFormat: "dd-MM-yyyy",
//                     invalidPlaceholder: "(data non valida)",
//                     timezone: "Europe/Rome",
//                 }, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
//             },

//             {
//                 title: "Nota", field: "note", editor: false, hozAlign: "center", vertAlign: "middle", cellClick: mostraNotaEstesa, tooltip: function (e, cell, onRendered) {
//                     var el1 = document.createElement("div");
//                     el1.style.backgroundColor = "#0d6efd";
//                     var el2 = document.createElement("span");
//                     el2.style.color = "#ffffff";
//                     el2.innerText = "Leggi tutto";
//                     el1.append(el2);
//                     return el1;
//                 }
//             },
//         ]
//     });
//     $("#nuovaNota").hide();
//     $("#modalNoteRichiesta").modal("show");
// }

// function mostraFormNuovaNota() {
//     $("#nuovaNota").show();
//     $("#aggiungiNotaButton").hide();
// }

function confirmAndArchive() {
    if($("input[name='nuoviStati']:checked").length==0){
        Swal.fire({
            html: "Non hai selezionato alcun nuovo stato per questa attività",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        })
    } else {
        Swal.fire({
            html: "<p>Vuoi archiviare la richiesta?</p><p>Per future operazioni sul paziente sarà necessario creare una nuova richiesta</p>",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                $("#isArchived").val(true);
                inserisci();

            }
        })
    }
}

// function salvaNote() {
//     event.preventDefault();
//     var newNoteDate = $("#nuovaNotaDate").val() + " 00:00:00";
//     var newNoteText = $("#nuovaNotaText").val();
//     if (newNoteDate != "" && newNoteText.trim() != "") {
//         var lu = sessionStorage.getItem("ricdomloggeduser");
//         if (lu != null) {
//             loggedUser = JSON.parse(lu);
//             var actualNotes = JSON.parse($("#noteRichiestaAttuali").val());
//             var newNoteObject = {};
//             newNoteObject.date = newNoteDate,
//                 newNoteObject.note = newNoteText;
//             newNoteObject.createdBy = loggedUser.id;
//             actualNotes.push(newNoteObject);
//             var username = loggedUser.username;
//             var token = "123456";
//             var richiesta = {};
//             richiesta.id = $("#idRichiestaNuovaNota").val();
//             richiesta.note = actualNotes;
//             var xhr = new XMLHttpRequest();
//             var url = "be/updateRequestNote.php";
//             xhr.open("POST", url, true);
//             xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4 && xhr.status === 200) {
//                     var result = JSON.parse(xhr.responseText);
//                     if (result.status == "OK") {
//                         Swal.fire({
//                             text: "Operazione compeltata.",
//                             icon: 'info',
//                             showCancelButton: false,
//                             confirmButtonColor: '#3085d6',
//                             confirmButtonText: 'Ok'
//                         }).then((result) => {
//                             if (result.isConfirmed) {
//                                 $("#modalNoteRichiesta").hide();
//                             }
//                         })
//                     } else {
//                         Swal.fire({
//                             text: "Errore durante l'aggiornamento.",
//                             icon: 'error',
//                             showCancelButton: false,
//                             confirmButtonColor: '#3085d6',
//                             confirmButtonText: 'Ok'
//                         })
//                     }
//                 }
//             }
//             xhr.send("username=" + username + "&token=" + token + "&richiesta=" + JSON.stringify(richiesta));
//         }

//     } else {
//         Swal.fire({
//             text: "Data e testo sono obbligatori",
//             icon: 'error',
//             showCancelButton: false,
//             confirmButtonColor: '#3085d6',
//             confirmButtonText: 'Ok'
//         });
//     }
// }

function getStatiAttivita(toBeCompleted) {
    var xhr = new XMLHttpRequest();
    var url = "be/getstatiattivita.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                toBeCompleted.statiAttivita = true;
                statiAttivita = result.data;
                sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
                sessionStorage.setItem("statiAttivita", JSON.stringify(statiAttivita));
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero dell'elenco degli stati attività.",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                });
                tipologie = null;
            }
        }
    }
    xhr.send();
}
