function buildAssistitoInsertForm(target) {

    let canBuild = false;
    switch (target) {
        case "insertAssistito":
            tar = "#insertAssistito";
            fun1 = "inserisciAssistito()";
            fun2 = "cleanAssistitoInsert()";
            attrs = {
                id: "idNuovoAssistito", // necessario per evitare id duplicati con la gestione richieste
                idUsca: "idUscaAssistito",
                nome: "nomeAssistito",
                cognome: "cognomeAssistito",
                codiceFiscale: "codiceFiscaleAssistito",
                telefono1: "telefono1Assistito",
                telefono2: "telefono2Assistito",
                email: "emailAssistito",
                indirizzo: "indirizzoAssistito",
                note: "noteAssistito",
                nascita: "nascitaAssistito",
                titleId: "insertAssistitoModalTitle",
                titleText: "Inserisci nuovo assistito"
            }
            canBuild = true;
            break;
        case "editAssistito":
            tar = "#editAssistito";
            fun1 = "aggiornaAssistito()";
            fun2 = "cleanAssistitoEdit()";
            attrs = {
                id: "idAssistito_Edit", // necessario per evitare id duplicati con la gestione richieste
                idUsca: "idUscaAssistitoEdit",
                nome: "nomeAssistitoEdit",
                cognome: "cognomeAssistitoEdit",
                codiceFiscale: "codiceFiscaleAssistitoEdit",
                telefono1: "telefono1AssistitoEdit",
                telefono2: "telefono2AssistitoEdit",
                email: "emailAssistitoEdit",
                indirizzo: "indirizzoAssistitoEdit",
                note: "noteAssistitoEdit",
                nascita: "nascitaAssistitoEdit",
                titleId: "editAssistitoModalTitle",
                titleText: "Modifica assistito"
            }
            canBuild = true;
            break;
    }

    if (canBuild) {
        let modal = $(tar).addClass("modal")/*.addClass("fade")*/.attr({ "id": target, "tabindex": "-1", "role": "dialog", "aria-labelledby": attrs.titleId, "aria-hidden": "true" });
        let modalDialog = $("<div>").addClass("modal-dialog").attr({ "role": "document" });
        let modalContent = $("<div>").addClass("modal-content");
        let modalHeader = $("<div>").addClass("modal-header");
        let modalBody = $("<div>").addClass("modal-body");
        let modalFooter = $("<div>").addClass("modal-footer");

        let el = $("<h5>").addClass("modal-title").attr({ "id": attrs.titleId }).html(attrs.titleText);
        modalHeader.append(el);
        modalContent.append(modalHeader);

        let form = $("<form>");
        let divFormGroup = $("<div>").addClass("form-group");
        el = $("<input>").attr({ "type": "hidden", "id": attrs.id });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.nome }).text("Nome");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.nome });
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.cognome }).text("Cognome");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.cognome });
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.nascita }).text("Data di nascita");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "date", "id": attrs.nascita });
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.codiceFiscale }).text("Codice Fiscale");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.codiceFiscale });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.telefono1 }).text("Telefono");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "tel", "id": attrs.telefono1, "pattern": "[0-9]{10}" });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.telefono2 }).text("Telefono");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "tel", "id": attrs.telefono2, "pattern": "[0-9]{10}" });
        divFormGroup.append(el);
        form.append(divFormGroup);


        divFormGroup = $("<div>").addClass("form-group");
        el = $("<label>").attr({ "for": attrs.email }).text("e-mail");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "email", "id": attrs.email });
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.indirizzo }).text("Indirizzo");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.indirizzo });
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.idUsca }).text("USCA di competenza");
        divFormGroup.append(el);
        el = $("<select>").addClass("form-richiesta").addClass("form-control").attr({ "id": attrs.idUsca });
        if (usca != null) {
            usca.forEach(element => {
                let option = $("<option>").attr({ "value": element.id }).text(element.descrizione);
                el.append(option);
            });
        }
        divFormGroup.append(el);

        let div4 = $("<div>").addClass("col");
        el = $("<label>").attr({ "for": attrs.note }).text("Note");
        div4.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.note });
        div4.append(el);
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
        el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({ "onClick": fun2/*"data-dismiss":"modal"*/ });
        modalFooter.append(el);
        modalContent.append(modalFooter);

        modalDialog.append(modalContent);
        modal.append(modalDialog);
    }
}

function inserisciAssistito() {
    let lu = localStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        loggedUser = JSON.parse(lu);
        let username = loggedUser.username;
        let token = "123456";
        let xhr = new XMLHttpRequest();
        let url = "be/insertAssistito.php";
        let assistito = {};
        assistito.nome = $("#nomeAssistito").val().toUpperCase();
        assistito.cognome = $("#cognomeAssistito").val().toUpperCase();
        assistito.codiceFiscale = $("#codiceFiscaleAssistito").val().toUpperCase();
        assistito.telefono1 = $("#telefono1Assistito").val();
        assistito.telefono2 = $("#telefono2Assistito").val();
        assistito.email = $("#emailAssistito").val();
        assistito.indirizzo = $("#indirizzoAssistito").val().toUpperCase();
        assistito.note = $("#noteAssistito").val();
        assistito.nascita = $("#nascitaAssistito").val();
        assistito.idUsca = $("#idUscaAssistito").val();
        let err = "";
        err += (assistito.nome == "") ? "Nome vuoto\n" : "";
        err += (assistito.cognome == "") ? "Cognome vuoto\n" : "";
        err += (assistito.codiceFiscale == "") ? "Codice Fiscale vuoto\n" : "";
        err += (assistito.email == "" && assistito.telefono == "") ? "E-mail e Telefono vuoti\n" : "";
        err += (assistito.indirizzo == "") ? "Indirizzo vuoto\n" : "";
        err += (assistito.nascita == "") ? "Data di nascita non valida\n" : "";
        if (err == "") {
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    result = JSON.parse(xhr.responseText);
                    if (result.status == "OK") {
                        Swal.fire({
                            text: "Operazione completata",
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                cleanAssistitoInsert();
                                showRequests(richieste, loggedUser);
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
            xhr.send("username=" + username + "&token=" + token + "&assistito=" + JSON.stringify(assistito));
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

function aggiornaAssistito() {
    let lu = localStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        loggedUser = JSON.parse(lu);
        let username = loggedUser.username;
        let token = "123456";
        let xhr = new XMLHttpRequest();
        let url = "be/editAssistito.php";
        let assistito = {};
        assistito.id = $("#idAssistito_Edit").val(); // necessario per evitare id duplicati con la gestione richieste
        assistito.nome = $("#nomeAssistitoEdit").val().toUpperCase();
        assistito.cognome = $("#cognomeAssistitoEdit").val().toUpperCase();
        assistito.codiceFiscale = $("#codiceFiscaleAssistitoEdit").val().toUpperCase();
        assistito.telefono1 = $("#telefono1AssistitoEdit").val();
        assistito.telefono2 = $("#telefono2AssistitoEdit").val();
        assistito.email = $("#emailAssistitoEdit").val();
        assistito.indirizzo = $("#indirizzoAssistitoEdit").val().toUpperCase();
        assistito.note = $("#noteAssistitoEdit").val();
        assistito.nascita = $("#nascitaAssistitoEdit").val();
        assistito.idUsca = $("#idUscaAssistitoEdit").val();
        let err = "";
        err += (assistito.nome == "") ? "Nome vuoto\n" : "";
        err += (assistito.cognome == "") ? "Cognome vuoto\n" : "";
        err += (assistito.codiceFiscale == "") ? "Codice Fiscale vuoto\n" : "";
        err += (assistito.email == "" && assistito.telefono == "") ? "E-mail e Telefono vuoti\n" : "";
        err += (assistito.indirizzo == "") ? "Indirizzo vuoto\n" : "";
        err += (assistito.idUsca == null) ? "USCA non selezionata\n" : "";
        err += (assistito.nascita == "") ? "Data di nascita non valida\n" : "";
        if (err == "") {
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    result = JSON.parse(xhr.responseText);
                    if (result.status == "OK") {
                        Swal.fire({
                            text: "Operazione completata",
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                cleanAssistitoEdit();
                                showRequests(richieste, loggedUser);
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
            xhr.send("username=" + username + "&token=" + token + "&assistito=" + JSON.stringify(assistito));
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

var showAssistitoUpdate = function (e, row) {
    $("#editAssistito").show();
    var element = row.getData();
    $("#idAssistito_Edit").val((element.hasOwnProperty("idAssistito"))?element.idAssistito:element.id);
    $("#idUscaAssistitoEdit").val(element.idUsca);
    $("#nomeAssistitoEdit").val(element.nome);
    $("#cognomeAssistitoEdit").val(element.cognome);
    $("#codiceFiscaleAssistitoEdit").val(element.codiceFiscale);
    $("#telefono1AssistitoEdit").val(element.telefono1);
    $("#telefono2AssistitoEdit").val(element.telefono2);
    $("#emailAssistitoEdit").val(element.email);
    $("#indirizzoAssistitoEdit").val(element.indirizzo);
    $("#noteAssistitoEdit").val(element.noteAssistito);
    $("#nascitaAssistitoEdit").val(((new luxon.DateTime.fromSQL(element.nascita)).toFormat("yyyy-MM-dd")));
}

function buildAssistitoEditForm(target) {
    buildAssistitoInsertForm(target);
}

function cleanAssistitoEdit() {
    $(".assitito-input-form").val('');
    $("#editAssistito").hide();
}

function cleanAssistitoInsert() {
    $(".assitito-input-form").val('');
    $("#insertAssistito").hide();
}

function showAssistiti(assistiti, user) {
    $("#assistiti").addClass('assistiti-form').html("");


    var table = new Tabulator("#assistiti", {
        data: assistiti,           //load row data from array
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


            { title: "#", field: "id", width: 5, editor: false, hozAlign: "center", visible: checkUserPermission(user, "canViewId") },
            {
                columns: [
                    {
                        title: "", width: 8, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canEditAssistito"), cellClick: checkUserPermission(user, "canEditAssistito") ? showAssistitoUpdate : null, formatter: function (cell, formatterParams, onRendered) {

                            return '<span class="material-icons-outlined" style="color: green">edit</span>';
                        }, headerSort: false
                    },
                    {
                        title: "", width: 8, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canDeleteAssistito"), cellClick: checkUserPermission(user, "canDeleteAssistito") ? deleteElement : null, formatter: function (cell, formatterParams, onRendered) {

                            return '<span class="material-icons-outlined" style="color: red">delete</span>';
                        }, headerSort: false
                    },
                    {
                        title: "", width: 8, field: "noteAssistito", editor: false, cellClick: cellPopupFormatterNoteAssistito, formatter: function (cell, formatterParams, onRendered) {
                            return (cell.getValue() == null) ? '' : '<span class="material-icons-outlined">notes</span>';
                        }, headerSort: false
                    },
                    {
                        title: "", width: 8, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canCreateRequest"), cellClick: checkUserPermission(user, "canCreateRequest") ? newRequest : null, formatter: function (cell, formatterParams, onRendered) {
        
                            return '<span class="material-icons-outlined" style="color: green">add</span>';
                        }, headerSort: false
                    },
                ]
            },

            { title: "Cognome", width: 150, field: "cognome", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Nome", width: 150, field: "nome", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            {
                title: "Nascita", field: "nascita", editor: false, formatter: "datetime", formatterParams: {
                    //inputFormat:"YYY-MM-DD HH:mm:ss",
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "",
                    timezone: "Europe/Rome",
                }
            },
            { title: "Codice Fiscale", field: "codiceFiscale", editor: false, hozAlign: "center", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            {
                columns: [
                    { title: "", field: "telefono1", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
                    { title: "", field: "telefono2", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
                    { title: "", field: "email", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
                ]
            },
            { title: "Indirizzo", width: 150, field: "indirizzo", formatter: "textarea", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            {
                title: "Usca", field: "usca", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },

            {
                title: "", field: "idUsca", visible: false
            },

        ]
    });

    if (checkUserPermission(user, "canExport")) {
        let button = $("<button>").addClass("btn btn-primary btn-block assistiti-form").attr({ "id": "dataDownLoadButton" }).html("Scarica assistiti").hide();
        $("#menubuttons").append(button);
        document.getElementById("dataDownLoadButton").addEventListener("click", function () {
            table.download("xlsx", "assistiti.xlsx", { sheetName: "Export" });
        });
    }
    $("#main").hide();
    setTimeout(checkNewData, 200);

}

function getAssistiti(toBeCompleted) {
    var table = Tabulator.findTable("#main")[0];
    var rowCount = 0;
    if (table != null && table != undefined) {
        rowCount = table.getDataCount();
    }
    if (rowCount == 0) {
        localStorage.setItem("lastRead", null);
    }
    let xhr = new XMLHttpRequest();
    let url = "be/getassistiti.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let ready = false;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                assistiti = result.data;
                toBeCompleted.assistiti = true;
                if (result.hasOwnProperty("lastRead")) {
                    localStorage.setItem("lastRead", result.lastRead);
                }
                if (result.hasOwnProperty("deleted")) {
                    localStorage.setItem("deleted", result.deleted);
                }
                //setTimeout(checkIfAreUpdatedData, 1000);
            } else {
                Swal.fire({
                    text: "Impossibile recuperare l'elenco degli assistiti.",
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