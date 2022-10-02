function showSwabs(swabs, user) {
    $("#mainSwabs").html("");

    var table = new Tabulator("#mainSwabs", {
        height: 890,
        data: swabs,           //load row data from array
        layout: "fitColumns",      //fit columns to width of table
        responsiveLayout: "collapse",  //hide columns that dont fit on the table
        //tooltips: true,            //show tool tips on cells
        addRowPos: "top",          //when adding a new row, add it to the top of the table
        history: true,             //allow undo and redo actions on the table
        pagination: "local",       //paginate the data
        paginationSize: 12,         //allow 7 rows per page of data
        paginationCounter: "rows", //display count of paginated rows in footer
        movableColumns: true,      //allow column order to be changed

        columns: [                 //define the table columns

            { title: "", field: "id", width: 10, editor: false, hozAlign: "center", vertAlign: "middle", visible: false },

            { title: "#", field: "idAssistito", width: 10, editor: false, hozAlign: "center", vertAlign: "middle", visible: checkUserPermission(user, "canViewId") },

            { title: "Cognome", field: "cognome", vertAlign: "middle", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Nome", field: "nome", editor: false, vertAlign: "middle", },
            {
                title: "Nascita", field: "nascita", editor: false, vertAlign: "middle", formatter: "datetime", formatterParams: {
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "(data non valida)",
                    timezone: "Europe/Rome",
                }
            },
            { title: "Codice Fiscale", field: "codiceFiscale", editor: false, hozAlign: "center", vertAlign: "middle", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Cont.1", field: "telefono1", visible: false },
            { title: "Cont.2", field: "telefono2", visible: false },
            { title: "Cont.3", field: "telefono3", visible: false },
            { title: "e-mail", field: "email", visible: false },
            {
                title: "Contatti", width: 150, field: "contatti", editor: false, hozAlign: "left", vertAlign: "middle", formatter: function (cell, formatterParams, onRendered) {
                    var out = "<div><ul>";
                    var val = cell.getValue();
                    var contatti = JSON.parse(val);
                    contatti.forEach(el => {
                        if (el != "") {
                            out += "<li>" + el;
                        }
                    });
                    out += "</ul></div>";
                    return out;
                }
            },
            { title: "Indirizzo", field: "indirizzo", vertAlign: "middle", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            {
                title: "Team", field: "usca", editor: false, hozAlign: "center", vertAlign: "middle", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like", visible: !user.permissions.canChangeUsca
            },
            { title: "#", field: "idTampone", editor: false, hozAlign: "center", vertAlign: "middle", visible: checkUserPermission(user, "canViewId") },
            {
                title: "Data Positività", field: "dataEsecuzione", editor: false, hozAlign: "center", vertAlign: "middle", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like", formatter: "datetime", formatterParams: {
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "(data non valida)",
                    timezone: "Europe/Rome",
                }
            },
            {
                title: "Data Consigliata", field: "dataConsigliata", editor: false, hozAlign: "center", vertAlign: "middle", formatter: "datetime", formatterParams: {
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "(data non valida)",
                    timezone: "Europe/Rome",
                }
            },
            {
                title: "Stato", field: "status", editor: false, hozAlign: "center", vertAlign: "middle", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },
            {
                title: "", field: "idStatus", visible: false
            },
            {
                title: "", width: 10, hozAlign: "center", vertAlign: "middle", editor: false, visible: checkUserPermission(user, "canCreateRequest"), cellClick: checkUserPermission(user, "canCreateRequest") ? changeSwabStatus : null, formatter: function (cell, formatterParams, onRendered) {

                    return '<span class="material-icons-outlined" style="color: green">edit</span>';
                }, tooltip: function (e, cell, onRendered) {
                    var el = document.createElement("div");
                    el.style.backgroundColor = "#0d6efd";
                    el.innerText = "Modifica stato";
                    return el;
                }
            },
            {
                title: "", width: 8, hozAlign: "center", vertAlign: "middle", editor: false, visible: checkUserPermission(user, "canCreateRequest"), cellClick: checkUserPermission(user, "canCreateRequest") ? newRequest : null, formatter: function (cell, formatterParams, onRendered) {

                    return '<span class="material-icons-outlined" style="color: green">add</span>';
                }, headerSort: false, tooltip: function (e, cell, onRendered) {
                    var el = document.createElement("div");
                    el.style.backgroundColor = "#0d6efd";
                    el.innerText = "Aggiungi richiesta";
                    return el;
                }
            },
            {
                title: "", field: "noteAssistito", vertAlign: "middle", editor: false/*, formatter: "textarea" */, cellClick: cellPopupFormatterNoteAssistito, formatter: function (cell, formatterParams, onRendered) {
                    return (cell.getValue() == null) ? '' : '<span class="material-icons-outlined">notes</span>';
                }, tooltip: function (e, cell, onRendered) {
                    var el = document.createElement("div");
                    el.style.backgroundColor = "#0d6efd";
                    el.innerText = "Note assistito";
                    return el;
                }
            },
        ]
    });

    if (checkUserPermission(user, "canExport")) {
        let button = $("<button>").addClass("btn btn-primary btn-block swabs-form").attr({ "id": "swabsDownLoadButton" }).html("Scarica tamponi");
        $("#menubuttons").append(button);
        document.getElementById("swabsDownLoadButton").addEventListener("click", function () {
            table.download("xlsx", "tamponi.xlsx", { sheetName: "Export" });
        });
    }
    $("#mainSwabs").hide();
    setTimeout(checkNewData, 2000);
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

var changeSwabStatus = function (e, row) {
    buildUpdateTamponiForm();
    var element = row.getData();
    $("#idTamponeEdit").val(element.idTampone);
    $("#statusTamponeEdit").val(element.idStatus);
    $("#tamponeEdit").show();
}

function uploadSwabs() {
    buildUpLoadTamponiForm();
    $("#tamponeUpload").show();
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
    $("#tamponeEdit").hide();
}

function cleanTamponeUpload() {
    $("#tamponeUpload").hide();
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
            var table = Tabulator.findTable("#mainSwabs")[0];
            var swabs = JSON.parse(sessionStorage.getItem("swabs"));
            if (swabs.length != 0) {
                table.updateOrAddData(swabs).then(function () {
                    setTimeout(checkNewData, 2000);
                })
            } else {
                table.clearData();
                setTimeout(checkNewData, 2000);
            }
        } else {
            setTimeout(updateTableDataTamponi, 200);
        }
    }
}
