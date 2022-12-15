function showRequests(richieste, user) {
    var mostraStorico = JSON.parse(sessionStorage.getItem("mostraStorico"));
    if (mostraStorico == null) {
        mostraStorico = false;
    }

    $.extend(true, $.fn.dataTable.defaults, {
        "stateSave": true,
        "stateDuration": -1,
        language: {
            lengthMenu: 'Mostra _MENU_ elementi per pagina',
            zeroRecords: 'Nessun risultato',
            info: 'Pagina _PAGE_ di _PAGES_',
            infoEmpty: 'Dati non disponibili',
            infoFiltered: '(filtrati da un totale di _MAX_ elementi)',
            "paginate": {
                "first": "<<",
                "last": ">>",
                "next": ">",
                "previous": "<"
            },
        },
        buttons: [
            {
                extend: 'collection',
                text: 'Export',
                buttons: ['csv', 'excel', 'pdf']
            }
        ]

    });
    if ($.fn.DataTable.isDataTable('#mainRequests')) {
        var datatable = $('#mainRequests').DataTable();
        datatable.clear();
        richieste.forEach(e => {
            var row = [];
            row.push(e.idRichiesta);
            row.push(formattaData(e.data, false));
            row.push(e.tipologia);
            row.push(e.priorita);
            row.push(e.archived);
            row.push(e.noteAssistito);
            row.push(e.cognome);
            row.push(e.nome);
            row.push(formattaData(e.nascita, false));
            row.push(e.eta);
            row.push(formattaEtaPerFascia(e.eta));
            row.push(e.codiceFiscale);
            row.push(formattaContatti(e.contatti));
            row.push(e.indirizzo);
            row.push(e.usca);
            row.push('<span class="material-icons-outlined" style="color: green" data-toggle="tooltip" title="Modifica stato">edit</span>');
            row.push('<span class="material-icons-outlined" style="color: green" data-toggle="tooltip" title="Aggiungi attività">add</span>');
            row.push('<span class="material-icons-outlined" style="color: red" data-toggle="tooltip" title="Cancella attività">delete</span>');
            row.push(e.telefono1);
            row.push(e.telefono2);
            row.push(e.telefono3);
            row.push(e.email);
            row.push(e.idAssistito);
            row.push(e.idRichiesta);
            row.push(e.idTipologia);
            row.push(e.idPriorita);
            row.push(e.idUsca);
            row.push(e.statiAttuali);
            row.push(e.noteRichiesta);
            row.push(e.nascita);
            row.push(e.data);
            datatable.row.add(row);
        })
        datatable.draw();
    } else {
        var tableHead = $("<thead>");
        var tr = $("<tr>");
        var el = $("<th>").html("id");
        tr.append(el);
        el = $("<th>").html("Programmata");
        tr.append(el);
        el = $("<th>").html("Tipologia");
        tr.append(el);
        el = $("<th>").html("Priorità");
        tr.append(el);
        el = $("<th>").html("Arch.");
        tr.append(el);
        el = $("<th>").html("Note");
        tr.append(el);
        el = $("<th>").html("Cognome");
        tr.append(el);
        el = $("<th>").html("Nome");
        tr.append(el);
        el = $("<th>").html("Nascita");
        tr.append(el);
        el = $("<th>").html("Età");
        tr.append(el);
        el = $("<th>").html("Fascia");
        tr.append(el);
        el = $("<th>").html("Codice Fiscale");
        tr.append(el);
        el = $("<th>").html("Contatti");
        tr.append(el);
        el = $("<th>").html("Indirizzo");
        tr.append(el);
        el = $("<th>").html("Team");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>").html("Cont.1");
        tr.append(el);
        el = $("<th>").html("Cont.2");
        tr.append(el);
        el = $("<th>").html("Cont.3");
        tr.append(el);
        el = $("<th>").html("e-mail");
        tr.append(el);
        el = $("<th>").html("idAssistito");
        tr.append(el);
        el = $("<th>").html("idRichiesta");
        tr.append(el);
        el = $("<th>").html("idTipologia");
        tr.append(el);
        el = $("<th>").html("idPriorita");
        tr.append(el);
        el = $("<th>").html("idUsca");
        tr.append(el);
        el = $("<th>").html("statiAttuali");
        tr.append(el);
        el = $("<th>").html("noteRichiesta");
        tr.append(el);
        el = $("<th>").html("nascita");
        tr.append(el);
        el = $("<th>").html("data");
        tr.append(el);
        tableHead.append(tr);
        $("#mainRequests").append(tableHead);
        tableBody = $("<tbody>");
        $("#mainRequests").append(tableBody);

        // $("#main").html("");
        var tableBody = tableBody = $("#mainRequests").find("tbody");
        // tableBody.html("");

        richieste.forEach(e => {
            tr = $("<tr>");
            el = $("<td>").html(e.idRichiesta);
            tr.append(el);

            el = $("<td>").html(formattaData(e.data, false));
            tr.append(el);
            el = $("<td>").html(e.tipologia);
            tr.append(el);
            el = $("<td>").html(e.priorita);
            tr.append(el);
            el = $("<td>").html(e.archived);
            tr.append(el);
            el = $("<td>").html(e.noteAssistito);
            tr.append(el);
            el = $("<td>").html(e.cognome);
            tr.append(el);
            el = $("<td>").html(e.nome);
            tr.append(el);
            el = $("<td>").html(formattaData(e.nascita, false));
            tr.append(el);
            el = $("<td>").html(e.eta);
            tr.append(el);
            el = $("<td>").html(formattaEtaPerFascia(e.eta));
            tr.append(el);
            el = $("<td>").html(e.codiceFiscale);
            tr.append(el);
            el = $("<td>").html(formattaContatti(e.contatti));
            tr.append(el);
            el = $("<td>").html(e.indirizzo);
            tr.append(el);
            el = $("<td>").html(e.usca);
            tr.append(el);
            el = $("<td>").html('<span class="material-icons-outlined" style="color: green" data-toggle="tooltip" title="Modifica stato">edit</span>');
            tr.append(el);
            el = $("<td>").html('<span class="material-icons-outlined" style="color: green" data-toggle="tooltip" title="Aggiungi attività">add</span>');
            tr.append(el);
            el = $("<td>").html('<span class="material-icons-outlined" style="color: red" data-toggle="tooltip" title="Cancella attività">delete</span>');
            tr.append(el);
            el = $("<td>").html(e.telefono1);
            tr.append(el);
            el = $("<td>").html(e.telefono2);
            tr.append(el);
            el = $("<td>").html(e.telefono3);
            tr.append(el);
            el = $("<td>").html(e.email);
            tr.append(el);
            el = $("<td>").html(e.idAssistito);
            tr.append(el);
            el = $("<td>").html(e.idRichiesta);
            tr.append(el);
            el = $("<td>").html(e.idTipologia);
            tr.append(el);
            el = $("<td>").html(e.idPriorita);
            tr.append(el);
            el = $("<td>").html(e.idUsca);
            tr.append(el);
            el = $("<td>").html(e.statiAttuali);
            tr.append(el);
            el = $("<td>").html(e.noteRichiesta);
            tr.append(el);
            el = $("<td>").html(e.nascita);
            tr.append(el);
            el = $("<td>").html(e.data);
            tr.append(el);
            tableBody.append(tr)
        })

    }


    if (!$.fn.DataTable.isDataTable('#mainRequests')) {
        $('#mainRequests').DataTable();
        $('#mainRequests tbody').on('click', 'td', function () {
            var table = $('#mainRequests').DataTable();
            try {
                var cell = $(table.cell(this).data()).html();
                if (cell == 'edit' || cell == 'add' || cell == 'notes' || cell == 'delete') {
                    var element = requestElementFromRow(table.row(this).data());
                    switch (cell) {
                        case 'edit':
                            showRequestUpdate(element);
                            break;
                        case 'add':
                            newRequest(element);
                            break;
                        case 'notes':
                            break;
                        case 'delete':
                            deleteElement(element);
                            break;
                    }
                }
            } catch {

            }

        });
    }

    var datatable = $('#mainRequests').DataTable();

    /*
    if (checkUserPermission(user, "canChangeUsca")) {
        datatable.columns(14).visible(false);
    }
    */

    if (!mostraStorico) {
        datatable.columns(4).visible(false);
    }

    if (checkUserPermission(user, "canDeleteRequest")) {
        datatable.columns(17).visible(false);
    }

    datatable.columns([18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]).visible(false);
}

function requestElementFromRow(row) {
    var element = {};
    element.idRichiesta = row[0];
    element.data = row[30];
    element.isArchived = row[4];
    element.noteAssistito = row[5];
    element.cognome = row[6];
    element.nome = row[7];
    element.nascita = row[29];
    element.codiceFiscale = row[11];
    element.indirizzo = row[13];
    element.telefono1 = row[18];
    element.telefono2 = row[19];
    element.telefono3 = row[20];
    element.email = row[21];
    element.idAssistito = row[22];
    element.idTipologia = row[24];
    element.idPriorita = row[25];
    element.idUsca = row[26];
    element.statiAttuali = (row[27] != "") ? row[27] : "[]";
    element.noteRichiesta = (row[28] != "") ? row[28] : "[]";
    return element;
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
        richiesta.assistito = assistito;
        richiesta.isArchived = false;
        var actualNotes = [];
        if ($("#noteRichiestaAttuali").val() != "") {
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
        if ($("#actionType").val() == "insert") {
            richiesta.createdBy = "" + loggedUser.id;
        } else {
            richiesta.lastUpdateBy = "" + loggedUser.id;
        }
        if ($("#isArchived").val() != undefined && JSON.parse($("#isArchived").val())) {
            richiesta.isArchived = true;
            richiesta.archivedBy = "" + loggedUser.id;
        }
        richiesta.nuoviStati = [];
        var nuoviStati = $("input[name='nuoviStati']:checked");
        for (var i = 0; i < nuoviStati.length; i++) {
            let tmp = $(nuoviStati[i]);
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
            var url = ($("#actionType").val() == "insert") ? "be/insertRequest.php" : "be/updateRequest.php";
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

function showRequestUpdate(element) {
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
    $("#insertFormButton1").attr({ "onClick": "inserisci()" });
    $("#insertFormButton2").attr({ "onClick": "cleanInsert()" });
    $("#nascita").val(((new luxon.DateTime.fromSQL(element.nascita)).toFormat("yyyy-MM-dd")));
    $("#isArchived").val(element.isArchived == "S");
    
    $("#insert").modal("show");

    if (JSON.parse(element.noteRichiesta).length > 0) {
        let noteRichiesta = JSON.parse(element.noteRichiesta);
        if ($.fn.DataTable.isDataTable('#noteRichiesta')) {
            var datatable = $('#noteRichiesta').DataTable();
            datatable.clear();
            noteRichiesta.forEach(e => {
                if (e.date != null && e.note != null) {
                    var row = [];
                    row.push(formattaData(e.date, false));
                    row.push(e.note);
                    datatable.row.add(row);
                }
            })
            datatable.draw();
        } else {
            var tableHead = $("<thead>");
            var tr = $("<tr>");
            var el = $("<th>").html("Data");
            tr.append(el);
            el = $("<th>").html("Nota");
            tr.append(el);
            tableHead.append(tr);
            $("#noteRichiesta").append(tableHead);
            tableBody = $("<tbody>");
            $("#noteRichiesta").append(tableBody);

            var tableBody = tableBody = $("#noteRichiesta").find("tbody");

            noteRichiesta.forEach(e => {
                if (e.date != null && e.note != null) {
                    tr = $("<tr>");
                    el = $("<td>").html(formattaData(e.date, false));
                    tr.append(el);
                    el = $("<td>").html(e.note);
                    tr.append(el);
                    tableBody.append(tr);
                }
            })

        }


        if (!$.fn.DataTable.isDataTable('#noteRichiesta')) {
            $('#noteRichiesta').DataTable({
                searching: false,
                paging: false,
                info: false,
                columns:[
                    {"width":"140px"},
                    {"width":"620px"},
                ]
                });
        }

    } else {
        $("#noteRichiesta").parent().hide();
    }
    if (JSON.parse(element.statiAttuali).length > 0) {
        let statiAttuali = JSON.parse(element.statiAttuali);
        if ($.fn.DataTable.isDataTable('#statiAttuali')) {
            var datatable = $('#statiAttuali').DataTable();
            datatable.clear();
            statiAttuali.forEach(e => {
                if (e.date != null && e.descrizione != null) {
                    var row = [];
                    row.push(formattaData(e.date, false));
                    row.push(e.descrizione);
                    datatable.row.add(row);
                }
            })
            datatable.draw();
        } else {
            var tableHead = $("<thead>");
            var tr = $("<tr>");
            var el = $("<th>").html("Data");
            tr.append(el);
            el = $("<th>").html("Attività svolta");
            tr.append(el);
            tableHead.append(tr);
            $("#statiAttuali").append(tableHead);
            tableBody = $("<tbody>");
            $("#statiAttuali").append(tableBody);

            var tableBody = tableBody = $("#statiAttuali").find("tbody");

            statiAttuali.forEach(e => {
                if (e.date != null && e.descrizione != null) {
                    tr = $("<tr>");
                    el = $("<td>").addClass("activityNoteColumn").html(formattaData(e.date, false));
                    tr.append(el);
                    el = $("<td>").addClass("activityNoteColumn").html(e.descrizione);
                    tr.append(el);
                    tableBody.append(tr);
                }
            })

        }


        if (!$.fn.DataTable.isDataTable('#statiAttuali')) {
            $('#statiAttuali').DataTable({
                searching: false,
                paging: false,
                info: false,
                columns:[
                    {"width":"140px"},
                    {"width":"620px"},
                ]
                });
        }

        $("#statiAttuali").parent().show();
    } else {
        $("#statiAttuali").parent().hide();
    }
    $(".note").hide();
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

// //create header popup contents
// var headerPopupFormatter = function (e, column, onRendered) {
//     var container = document.createElement("div");

//     var label = document.createElement("label");
//     label.innerHTML = "Filter Column:";
//     label.style.display = "block";
//     label.style.fontSize = ".7em";

//     var input = document.createElement("input");
//     input.placeholder = "Filter Column...";
//     input.value = column.getHeaderFilterValue() || "";

//     input.addEventListener("keyup", (e) => {
//         column.setHeaderFilterValue(input.value);
//     });

//     container.appendChild(label);
//     container.appendChild(input);

//     return container;
// }

// //create dummy header filter to allow popup to filter
// var emptyHeaderFilter = function () {
//     return document.createElement("div");;
// }

// var cellPopupFormatterNoteAssistito = function (e, row, onRendered) {
//     var data = row.getData();
//     cellPopupFormatter(data.hasOwnProperty("noteAssistito") ? data.noteAssistito : data.note);
// };


// var cellPopupFormatter = function (title, text) {
//     Swal.fire({
//         title: title,
//         text: text,
//         icon: 'info',
//         showCancelButton: false,
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'Ok'
//     })
// };

function checkDatiObbligatori(richiesta) {
    let out = '';
    if (!richiesta.isArchived && richiesta.idTipologia == "") {
        out += "<p>Non hai selezionato la tipologia di attività da programmare</p>";
    }
    if (!richiesta.isArchived && richiesta.idPriorita == "") {
        out += "<p>Non hai selezionato la priorità dell'attività da programmare</p>";
    }
    if (richiesta.data == null || richiesta.data == "") {
        out += "<p>La data è obbligatoria</p>";
    }
    if (!richiesta.isArchived && richiesta.assistito.idUsca == null) {
        out += "<p>Non è selezionato alcun Team</p>";
    }
    if (richiesta.nuoviStati.length == 0) {
        out += "<p>Non hai selezionato alcun nuovo stato per questa attività</p>";
    }
    return out;
}

function newRequest(element) {
    // var element = row.getData();
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
    $("#noteRichiesta").hide();
    $("#data").val((new luxon.DateTime.fromJSDate(new Date())).toFormat("yyyy-MM-dd"));
    $("#nascita").val(((new luxon.DateTime.fromSQL(element.nascita)).toFormat("yyyy-MM-dd")));
    $("#mostraNoteButton").hide();

    $("#actionType").val("insert");
    $("#insertFormButton1").attr({ "onClick": "inserisci()" });
    $("#insertFormButton2").attr({ "onClick": "cleanInsert()" });
    $("#isArchived").val(false)
    $("#insert").modal("show");
}


// var cellPopupFormatterDettagliRichiesta = function (e, row) {
//     var element = row.getData();
//     Swal.fire({
//         html: "<p>Scheda creata il: " + element.created + " da " + element.createdByNomeCognome + "</p>" + ((element.lastUpdate != null) ? "<p>Modificata il: " + element.lastUpdate + " da " + element.lastUpdateByNomeCognome + "</p>" : ""),
//         icon: 'info',
//         showCancelButton: false,
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'Ok'
//     });
// }

// var mostraNotaEstesa = function (e, row) {
//     var element = row.getData();
//     Swal.fire({
//         html: "<div>" + element.note + "</div>",
//         icon: 'info',
//         showCancelButton: false,
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'Ok'
//     });
// }


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
            var richieste = JSON.parse(sessionStorage.getItem("richieste"));
            var user = JSON.parse(sessionStorage.getItem("ricdomloggeduser"));
            showRequests(richieste, user);
        } else {
            setTimeout(updateRequestData, 1000);
        }
    }
}

function confirmAndArchive() {
    if ($("input[name='nuoviStati']:checked").length == 0) {
        Swal.fire({
            html: "Non hai selezionato alcun nuovo stato per questa attività",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        })
    } else {
        Swal.fire({
            html: "<p>Vuoi archiviare l'attività?</p><p>Per future operazioni sul paziente sarà necessario crearne una nuova.</p>",
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
