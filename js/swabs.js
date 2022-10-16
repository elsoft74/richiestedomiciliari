function showSwabs(swabs, user) {
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
                buttons: [ 'csv', 'excel', 'pdf' ]
            }
        ]
    
    });
    if ($.fn.DataTable.isDataTable('#mainSwabs')) {
        var datatable = $('#mainSwabs').DataTable();
        datatable.clear();
        swabs.forEach(element=>{
            var row=[];
            row.push(element.id);
            row.push(element.idAssistito);
            row.push(element.cognome);
            row.push(element.nome);
            row.push(formattaData(element.nascita, false));
            row.push(element.eta);
            row.push(formattaEtaPerFascia(element.eta));
            row.push(element.nascita);
            row.push(element.codiceFiscale);
            row.push(element.telefono1);
            row.push(element.telefono2);
            row.push(element.telefono3);
            row.push(element.email);
            row.push(formattaContatti(element.contatti));
            row.push(element.indirizzo);
            row.push(element.usca);
            row.push(formattaData(element.dataEsecuzione, false));
            row.push(element.dataEsecuzione);
            row.push(formattaData(element.dataConsigliata, false));
            row.push(element.dataConsigliata);
            row.push(element.status);
            row.push(element.idStatus);
            row.push('<span class="material-icons-outlined" style="color: green" data-toggle="tooltip" title="Modifica stato">edit</span>');
            row.push('<span class="material-icons-outlined" style="color: green" data-toggle="tooltip" title="Aggiungi attività">add</span>');
            row.push((element.noteAssistito != null && element.noteAssistito.trim() != "") ? '<span class="material-icons-outlined" data-toggle="tooltip" title="Note assistito">notes</span>' : '');
            row.push(element.idUsca);
            datatable.row.add(row);
        })
        datatable.draw();
    } else {
        var tableHead = $("<thead>");
        var tr = $("<tr>");
        var el = $("<th>").html("id");
        tr.append(el);
        el = $("<th>");
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
        el = $("<th>");
        tr.append(el);
        el = $("<th>").html("Codice Fiscale");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>").html("Contatti");
        tr.append(el);
        el = $("<th>").html("Indirizzo");
        tr.append(el);
        el = $("<th>").html("Team");
        tr.append(el);
        el = $("<th>").html("Data Positività");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>").html("Data Consigliata");
        tr.append(el);
        el = $("<th>").html("");
        tr.append(el);
        el = $("<th>").html("Stato");
        tr.append(el);
        el = $("<th>").html("");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        tableHead.append(tr);
        $("#mainSwabs").append(tableHead);
        tableBody = $("<tbody>");
        $("#mainSwabs").append(tableBody);

        // $("#mainSwabs").html("");
        var tableBody = tableBody = $("#mainSwabs").find("tbody");
        // tableBody.html("");

        swabs.forEach(e => {
            tr = $("<tr>");
            el = $("<td>").html(e.id);
            tr.append(el);
            el = $("<td>").html(e.idAssistito);
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
            el = $("<td>").html(e.nascita);
            tr.append(el);
            el = $("<td>").html(e.codiceFiscale);
            tr.append(el);
            el = $("<td>").html(e.telefono1);
            tr.append(el);
            el = $("<td>").html(e.telefono2);
            tr.append(el);
            el = $("<td>").html(e.telefono3);
            tr.append(el);
            el = $("<td>").html(e.email);
            tr.append(el);
            el = $("<td>").html(formattaContatti(e.contatti));
            tr.append(el);
            el = $("<td>").html(e.indirizzo);
            tr.append(el);
            el = $("<td>").html(e.usca);
            tr.append(el);
            el = $("<td>").html(formattaData(e.dataEsecuzione, false));
            tr.append(el);
            el = $("<td>").html(e.dataEsecuzione);
            tr.append(el);
            el = $("<td>").html(formattaData(e.dataConsigliata, false));
            tr.append(el);
            el = $("<td>").html(e.dataConsigliata);
            tr.append(el);
            el = $("<td>").html(e.status);
            tr.append(el);
            el = $("<td>").html(e.idStatus);
            tr.append(el);
            el = $("<td>").html('<span class="material-icons-outlined" style="color: green" data-toggle="tooltip" title="Modifica stato">edit</span>');
            tr.append(el);
            el = $("<td>").html('<span class="material-icons-outlined" style="color: green" data-toggle="tooltip" title="Aggiungi attività">add</span>');
            tr.append(el);
            el = $("<td>").html((e.noteAssistito != null && e.noteAssistito.trim() != "") ? '<span class="material-icons-outlined" data-toggle="tooltip" title="Note assistito">notes</span>' : '');
            tr.append(el);
            el = $("<td>").html(e.idUsca);
            tr.append(el);
            tableBody.append(tr)
        })

    }


    if (!$.fn.DataTable.isDataTable('#mainSwabs')) {
        $('#mainSwabs').DataTable();
        $('#mainSwabs tbody').on('click', 'td', function () {
            var table = $('#mainSwabs').DataTable();
            try {
                var cell = $(table.cell(this).data()).html();
                if (cell == 'edit' || cell == 'add' || cell == 'notes') {
                    var element = elementFromRow(table.row(this).data());
                    switch (cell) {
                        case 'edit':
                            changeSwabStatus(element);
                            break;
                        case 'add':
                            newRequest(element);
                            break;
                        case 'notes':
                            break;
                    }
                }
            } catch {

            }

        });
    }

    var datatable = $('#mainSwabs').DataTable();

    if (checkUserPermission(user, "canChangeUsca")) {
        datatable.columns(15).visible(false);
    }
    
    datatable.columns([1,7,9,10,11,12,17,19,21,25]).visible(false);
}

function readSwabs(toBeCompleted) {
    var xhr = new XMLHttpRequest();
    var url = "be/getswabs.php";
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
                var swabs = result.data;
                toBeCompleted.swabs = true;
                if (result.hasOwnProperty("lastRead")) {
                    sessionStorage.setItem("lastRead", result.lastRead);
                }
                sessionStorage.setItem("swabs", JSON.stringify(swabs));
                sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
                setTimeout(checkNewData, 2000);
            } else {
                Swal.fire({
                    text: "Impossibile recuperare l'elenco dei tamponi.",
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

function elementFromRow(row) {
    var element = {};
    element.id = row[0];
    element.idTampone = row[0];
    element.idAssistito = row[1];
    element.cognome = row[2];
    element.nome = row[3];
    element.nascita = row[7];
    element.codiceFiscale = row[8];
    element.telefono1 = row[9];
    element.telefono2 = row[10];
    element.telefono3 = row[11];
    element.email = row[12];
    element.indirizzo = row[14];
    element.idUsca = row[15];
    element.dataEsecuzione = row[17];
    element.dataConsigliata = row[19];
    element.idStatus = row[21];
    element.idUsca = row[25];
    return element;
}

function changeSwabStatus(element) {
    buildUpdateTamponiForm();
    $("#idTamponeEdit").val(element.idTampone);
    $("#statusTamponeEdit").val(element.idStatus);
    $("#tamponeEdit").modal("show");
}

function uploadSwabs() {
    buildUpLoadTamponiForm();
    $("#tamponeUpload").modal("show");
}

function aggiornaTampone() {
    var lu = sessionStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        loggedUser = JSON.parse(lu);
        var username = loggedUser.username;
        var token = "123456";
        var tampone = {};
        tampone.id = $("#idTamponeEdit").val();
        tampone.status = $("#statusTamponeEdit").val();
        tampone.lastUpdateBy = "" + loggedUser.id;


        var xhr = new XMLHttpRequest();
        var url = "be/updateSwab.php";
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
                            cleanTamponeEdit();
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
        xhr.send("username=" + username + "&token=" + token + "&tampone=" + JSON.stringify(tampone));
    }
}

function buildUpdateTamponiForm() {

    var fun1 = "aggiornaTampone()";
    var fun2 = "cleanTamponeEdit()";
    var attrs = {
        idTampone: "idTamponeEdit",
        status: "statusTamponeEdit",

    }
    $("#tamponeEdit").html("");
    var modal = $("#tamponeEdit").addClass("modal")/*.addClass("fade")*/.attr({ "id": "tamponeEdit", "tabindex": "-1", "role": "dialog", "aria-labelledby": attrs.titleId, "aria-hidden": "true" });
    var modalDialog = $("<div>").addClass("modal-dialog").attr({ "role": "document" });
    var modalContent = $("<div>").addClass("modal-content");
    var modalHeader = $("<div>").addClass("modal-header");
    var modalBody = $("<div>").addClass("modal-body");
    var modalFooter = $("<div>").addClass("modal-footer");

    var el = $("<h5>").addClass("modal-title").attr({ "id": attrs.titleId }).html(attrs.titvarext);
    modalHeader.append(el);
    modalContent.append(modalHeader);

    var form = $("<form>");
    var divFormGroup = $("<div>").addClass("form-group");
    el = $("<input>").attr({ "type": "hidden", "id": attrs.idTampone });
    divFormGroup.append(el);
    el = $("<label>").attr({ "for": attrs.roleId }).text("Nuovo stato");
    divFormGroup.append(el);
    el = $("<select>").addClass('user-input-form').addClass("form-control").attr({ "id": attrs.status });
    var statiTamponi = JSON.parse(sessionStorage.getItem("statiTamponi"));
    if (statiTamponi != null) {
        statiTamponi.forEach(element => {
            let option = $("<option>").attr({ "value": element.id }).text(element.descrizione);
            el.append(option);
        });
    }
    divFormGroup.append(el);

    form.append(divFormGroup);

    modalBody.append(form);
    modalContent.append(modalBody);

    el = $("<button>").addClass("btn").addClass("btn-primary").text("Conferma").attr({ "onClick": fun1 });
    modalFooter.append(el);
    el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({ "onClick": fun2 });
    modalFooter.append(el);
    modalContent.append(modalFooter);

    modalDialog.append(modalContent);
    modal.append(modalDialog);
}

function cleanTamponeEdit() {
    $("#idTamponeEdit").val('');
    $("#statusTamponeEdit").val('');
    $("#tamponeEdit").modal("hide");
}

function cleanTamponeUpload() {
    $("#tamponeUpload").modal("hide");
    $("#tamponeUpload").html('');
}

function getStatiTamponi(toBeCompleted) {
    var xhr = new XMLHttpRequest();
    var url = "be/getStatiTamponi.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                toBeCompleted.statiTamponi = true;
                var statiTamponi = result.data;
                sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
                sessionStorage.setItem("statiTamponi", JSON.stringify(statiTamponi));
            } else {
                Swal.fire({
                    text: "C'è un problema con il recupero degli stati tamponi.",
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

function buildUpLoadTamponiForm() {

    var fun1 = 'uploadExcelTamponi()'
    var fun2 = '$("#tamponeUpload").hide()';
    var attrs = {
        status: "statusTamponeUpload",
        file: "uploadTamponiFile",
        fileText: "File da caricare",
        statusText: "Stato di default"

    }
    $("#tamponeUpload").html("");
    var modal = $("#tamponeUpload").addClass("modal")/*.addClass("fade")*/.attr({ "id": "tamponeUpload", "tabindex": "-1", "role": "dialog", "aria-labelledby": attrs.titleId, "aria-hidden": "true" });
    var modalDialog = $("<div>").addClass("modal-dialog").attr({ "role": "document" });
    var modalContent = $("<div>").addClass("modal-content");
    var modalHeader = $("<div>").addClass("modal-header");
    var modalBody = $("<div>").addClass("modal-body");
    var modalFooter = $("<div>").addClass("modal-footer");

    var el = $("<h5>").addClass("modal-title").attr({ "id": attrs.titleId }).html(attrs.titvarext);
    modalHeader.append(el);
    modalContent.append(modalHeader);

    var form = $("<form>").attr({ "id": "formFiles" });
    var divFormGroup = $("<div>").addClass("form-group");
    el = $("<label>").addClass("form-label").attr({ "for": attrs.file }).text(attrs.fileText);
    divFormGroup.append(el);
    el = $("<input>").addClass("form-control").attr({ "id": attrs.file, "type": "file", "name": "files", "accept": ".xls, .xlsx, .csv" });
    divFormGroup.append(el);
    el = $("<label>").attr({ "for": attrs.status }).text(attrs.statusText);
    divFormGroup.append(el);
    el = $("<select>").addClass('user-input-form').addClass("form-control").attr({ "id": attrs.status });
    var statiTamponi = JSON.parse(sessionStorage.getItem("statiTamponi"));
    if (statiTamponi != null) {
        statiTamponi.forEach(element => {
            let option = $("<option>").attr({ "value": element.id }).text(element.descrizione);
            el.append(option);
        });
    }
    divFormGroup.append(el);

    form.append(divFormGroup);

    modalBody.append(form);
    modalContent.append(modalBody);

    el = $("<button>").addClass("btn").addClass("btn-primary").text("Conferma").attr({ "onClick": fun1 });
    modalFooter.append(el);
    el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({ "onClick": fun2 });
    modalFooter.append(el);
    modalContent.append(modalFooter);

    modalDialog.append(modalContent);
    modal.append(modalDialog);
}

function uploadExcelTamponi() {
    var lu = sessionStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        loggedUser = JSON.parse(lu);
        var username = loggedUser.username;
        var token = "123456";
        var f = $("#uploadTamponiFile").prop("files");
        if (f == undefined || f.length == 0) {
            Swal.fire({
                text: "Nessun file da caricare.",
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            });
        } else {
            var formData = new FormData();
            formData.append("status", $("#statusTamponeUpload").val());
            formData.append("files", f.length);
            formData.append("file", f[0]);
            formData.append("username", username);
            formData.append("token", token);
            var xhr = new XMLHttpRequest();
            var url = "be/caricaExcelTamponi.php";
            xhr.open("POST", url, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var result = JSON.parse(xhr.responseText);
                    if (result.status == "OK") {
                        $("#loader").hide();
                        Swal.fire({
                            text: JSON.stringify(result.report) + ((result.report.errori != 0) ? "\n errori alle righe:" + JSON.stringify(result.errors) : ""),
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                cleanTamponeUpload();
                            }
                        })

                    } else {
                        Swal.fire({
                            text: "C'è un problema con il caricamento dei tamponi.",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        });
                    }
                }
            }
            $("#loader").show();
            xhr.send(formData);
            event.preventDefault();
        }
    }


}


function updateTableDataTamponi() {
    var waitingForDataTamponi = JSON.parse(sessionStorage.getItem("waitingForDataTamponi"));
    var toBeCompleted = JSON.parse(sessionStorage.getItem("toBeCompleted"));
    if (waitingForDataTamponi != null && !waitingForDataTamponi) {
        waitingForDataTamponi = true;
        toBeCompleted.swabs = false;
        sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
        sessionStorage.setItem("waitingForDataTamponi", JSON.stringify(waitingForDataTamponi));
        readSwabs(toBeCompleted);
        setTimeout(updateTableDataTamponi, 200);
    } else {
        if (toBeCompleted.swabs) {
            waitingForDataTamponi = false;
            sessionStorage.setItem("waitingForDataTamponi", JSON.stringify(waitingForDataTamponi));
            // var table = Tabulator.findTable("#mainSwabs")[0];
            var swabs = JSON.parse(sessionStorage.getItem("swabs"));
            var user = JSON.parse(sessionStorage.getItem("ricdomloggeduser"));
            showSwabs(swabs, user);
            // if (swabs.length != 0) {
            //     var rows = table.getRows();
            //     var newIds = [];
            //http://192.168.1.163/richiestedomiciliari/index.php     swabs.forEach(el=>{
            //         newIds.push(parseInt(el.id));
            //     });
            //     rows.forEach(el=>{
            //         if (!newIds.includes(parseInt(el.getIndex()))){
            //             table.deleteRow(parseInt(el.getIndex()));
            //         }
            //     })
            //     table.updateOrAddData(swabs).then(function () {
            //         setTimeout(checkNewData, 2000);
            //     })
            // } else {
            //     table.clearData();
            //     setTimeout(checkNewData, 2000);
            // }
        } else {
            setTimeout(updateTableDataTamponi, 200);
        }
    }
}
