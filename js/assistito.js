function buildAssistitoInsertForm(target) {

    var canBuild = false;
    var attrs = {};
    var tar = null;
    var fun1 = null;
    var fun2 = null;
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
                telefono3: "telefono3Assistito",
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
            fun1 = "showAssistitoUpdate()";
            fun2 = "cleanAssistitoEdit()";
            attrs = {
                id: "idAssistito_Edit", // necessario per evitare id duplicati con la gestione richieste
                idUsca: "idUscaAssistitoEdit",
                nome: "nomeAssistitoEdit",
                cognome: "cognomeAssistitoEdit",
                codiceFiscale: "codiceFiscaleAssistitoEdit",
                telefono1: "telefono1AssistitoEdit",
                telefono2: "telefono2AssistitoEdit",
                telefono3: "telefono3AssistitoEdit",
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
        var modal = $(tar).addClass("modal")/*.addClass("fade")*/.attr({ "id": target, "tabindex": "-1", "role": "dialog", "aria-labelledby": attrs.titleId, "aria-hidden": "true" });
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
        el = $("<label>").attr({ "for": attrs.telefono1 }).text("Telefono 1");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "tel", "id": attrs.telefono1, "pattern": "[0-9]{10}" });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.telefono2 }).text("Telefono 2");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "tel", "id": attrs.telefono2, "pattern": "[0-9]{10}" });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.telefono3 }).text("Telefono 3");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "tel", "id": attrs.telefono3, "pattern": "[0-9]{10}" });
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

        el = $("<label>").attr({ "for": attrs.idUsca }).text("UCA di competenza");
        divFormGroup.append(el);
        el = $("<select>").addClass("form-richiesta").addClass("form-control").attr({ "id": attrs.idUsca });
        var usca = JSON.parse(sessionStorage.getItem("usca"));
        if (usca != null) {
            usca.forEach(element => {
                let option = $("<option>").attr({ "value": element.id }).text(element.descrizione);
                el.append(option);
            });
        }
        divFormGroup.append(el);

        var div4 = $("<div>").addClass("col");
        el = $("<label>").attr({ "for": attrs.note }).text("Note");
        div4.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.note });
        div4.append(el);
        var div5 = $("<div>").addClass("input-group-addon");
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
    var lu = sessionStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        var loggedUser = JSON.parse(lu);
        var xhr = new XMLHttpRequest();
        var url = "be/insertAssistito.php";
        var assistito = {};
        assistito.nome = $("#nomeAssistito").val().toUpperCase();
        assistito.cognome = $("#cognomeAssistito").val().toUpperCase();
        assistito.codiceFiscale = $("#codiceFiscaleAssistito").val().toUpperCase();
        assistito.telefono1 = $("#telefono1Assistito").val();
        assistito.telefono2 = $("#telefono2Assistito").val();
        assistito.telefono3 = $("#telefono3Assistito").val();
        assistito.email = $("#emailAssistito").val();
        assistito.indirizzo = $("#indirizzoAssistito").val().toUpperCase();
        assistito.note = $("#noteAssistito").val();
        assistito.nascita = $("#nascitaAssistito").val();
        assistito.idUsca = $("#idUscaAssistito").val();
        var err = "";
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
                    var result = JSON.parse(xhr.responseText);
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
            xhr.send("assistito=" + JSON.stringify(assistito));
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
    let lu = sessionStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        var loggedUser = JSON.parse(lu);
        var xhr = new XMLHttpRequest();
        var url = "be/editAssistito.php";
        var assistito = {};
        assistito.id = $("#idAssistito_Edit").val(); // necessario per evitare id duplicati con la gestione richieste
        assistito.nome = $("#nomeAssistitoEdit").val().toUpperCase();
        assistito.cognome = $("#cognomeAssistitoEdit").val().toUpperCase();
        assistito.codiceFiscale = $("#codiceFiscaleAssistitoEdit").val().toUpperCase();
        assistito.telefono1 = $("#telefono1AssistitoEdit").val();
        assistito.telefono2 = $("#telefono2AssistitoEdit").val();
        assistito.telefono3 = $("#telefono3AssistitoEdit").val();
        assistito.email = $("#emailAssistitoEdit").val();
        assistito.indirizzo = $("#indirizzoAssistitoEdit").val().toUpperCase();
        assistito.note = $("#noteAssistitoEdit").val();
        assistito.nascita = $("#nascitaAssistitoEdit").val();
        assistito.idUsca = $("#idUscaAssistitoEdit").val();
        var err = "";
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
                    var result = JSON.parse(xhr.responseText);
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
            xhr.send("assistito=" + JSON.stringify(assistito));
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

function assistitoElementFromRow(row) {
    var element = {};
    element.idAssistito = row[0];
    element.cognome = row[1];
    element.nome = row[2];
    element.nascita = row[18];
    element.codiceFiscale = row[6];
    element.indirizzo = row[8];
    element.telefono1 = row[12];
    element.telefono2 = row[13];
    element.telefono3 = row[14];
    element.email = row[15];
    element.idUsca = row[16];
    element.noteAssistito = row[17];
    return element;
}

function showAssistitoUpdate (element) {
    $("#editAssistito").modal("show");
    $("#idAssistito_Edit").val((element.hasOwnProperty("idAssistito")) ? element.idAssistito : element.id);
    $("#idUscaAssistitoEdit").val(element.idUsca);
    $("#nomeAssistitoEdit").val(element.nome);
    $("#cognomeAssistitoEdit").val(element.cognome);
    $("#codiceFiscaleAssistitoEdit").val(element.codiceFiscale);
    $("#telefono1AssistitoEdit").val(element.telefono1);
    $("#telefono2AssistitoEdit").val(element.telefono2);
    $("#telefono3AssistitoEdit").val(element.telefono3);
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
    $("#editAssistito").modal("hide");
}

function cleanAssistitoInsert() {
    $(".assitito-input-form").val('');
    $("#insertAssistito").modal("hide");
}

function showAssistiti(assistiti, user) {

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
    if ($.fn.DataTable.isDataTable('#assistiti')) {
        var datatable = $('#assistiti').DataTable();
        datatable.clear();
        assistiti.forEach(e => {
            var row = [];
            row.push(e.id);
            row.push(e.cognome);
            row.push(e.nome);
            row.push(formattaData(e.nascita, false));
            row.push(e.eta);
            row.push(formattaEtaPerFascia(e.eta));
            row.push(e.codiceFiscale);
            row.push(formattaContatti(e.contatti));
            row.push(e.indirizzo);
            row.push(e.usca);
            row.push('<span class="material-icons-outlined" style="color: green" data-toggle="tooltip" title="Modifica">edit</span>');
            row.push((e.note!=null && e.nome.trim()!="")?'<span class="material-icons-outlined" data-toggle="tooltip" title="Visualizza note">notes</span>':'');
            row.push(e.telefono1);
            row.push(e.telefono2);
            row.push(e.telefono3);
            row.push(e.email);
            row.push(e.idUsca);
            row.push(e.note);
            row.push(e.nascita);
            datatable.row.add(row);
        })
        datatable.draw();
    } else {
        var tableHead = $("<thead>");
        var tr = $("<tr>");
        var el = $("<th>").html("id");
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
        el = $("<th>").html("Note");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>");
        tr.append(el);
        el = $("<th>");
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
        $("#assistiti").append(tableHead);
        tableBody = $("<tbody>");
        $("#assistiti").append(tableBody);

        var tableBody = tableBody = $("#assistiti").find("tbody");
        
        assistiti.forEach(e => {
            tr = $("<tr>");
            el = $("<td>").html(e.id);
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
            el = $("<td>").html('<span class="material-icons-outlined" style="color: green" data-toggle="tooltip" title="Modifica">edit</span>');
            tr.append(el);
            el = $("<td>").html((e.note!=null && e.nome.trim()!="")?'<span class="material-icons-outlined" data-toggle="tooltip" title="Visualizza note">notes</span>':'');
            tr.append(el);
            el = $("<td>").html(e.telefono1);
            tr.append(el);
            el = $("<td>").html(e.telefono2);
            tr.append(el);
            el = $("<td>").html(e.telefono3);
            tr.append(el);
            el = $("<td>").html(e.email);
            tr.append(el);
            el = $("<td>").html(e.idUsca);
            tr.append(el);
            el = $("<td>").html(e.note);
            tr.append(el);
            el = $("<td>").html(e.nascita);
            tr.append(el);
            tableBody.append(tr)
        })

    }


    if (!$.fn.DataTable.isDataTable('#assistiti')) {
        $('#assistiti').DataTable();
        $('#assistiti tbody').on('click', 'td', function () {
            var table = $('#assistiti').DataTable();
            try {
                var cell = $(table.cell(this).data()).html();
                if (cell == 'edit' || cell == 'notes') {
                    var element = assistitoElementFromRow(table.row(this).data());
                    switch (cell) {
                        case 'edit':
                            showAssistitoUpdate(element);
                            break;
                        case 'notes':
                            break;
                    }
                }
            } catch {

            }

        });
    }

    var datatable = $('#assistiti').DataTable();

    if (checkUserPermission(user, "assistiti")) {
        datatable.columns(9).visible(false);
    }

    datatable.columns([12, 13, 14, 15, 16, 17, 18]).visible(false);
    setTimeout(checkNewData, 2000);

}

function getAssistiti(toBeCompleted) {
    var xhr = new XMLHttpRequest();
    var url = "be/getassistiti.php";
    var activeUsca = sessionStorage.getItem("activeUsca");
    if(activeUsca == null){
        activeUsca = "ALL";
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                var assistiti = result.data;
                toBeCompleted.assistiti = true;
                sessionStorage.setItem("assistiti", JSON.stringify(assistiti));
                sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
                if (result.hasOwnProperty("lastRead")) {
                    sessionStorage.setItem("lastRead", result.lastRead);
                }
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
    xhr.send("lastRead=" + sessionStorage.getItem("lastRead")+"&activeUsca="+activeUsca);
}

function updateTableDataAssistiti() {
    var waitingForDataAssistiti = JSON.parse(sessionStorage.getItem("waitingForDataAssistiti"));
    var toBeCompleted = JSON.parse(sessionStorage.getItem("toBeCompleted"));
    if (waitingForDataAssistiti != null && !waitingForDataAssistiti) {
        waitingForDataAssistiti = true;
        toBeCompleted.assistiti = false;
        sessionStorage.setItem("waitingForDataAssistiti", JSON.stringify(waitingForDataAssistiti));
        sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
        readAssistiti(toBeCompleted);
        setTimeout(updateTableDataAssistiti, 1000);
    } else {
        if (toBeCompleted.assistiti) {
            waitingForDataAssistiti = false;
            sessionStorage.setItem("waitingForDataAssistiti", JSON.stringify(waitingForDataAssistiti));
            // var table = Tabulator.findTable("#assistiti")[0];
            // table.updateOrAddData(assistiti).then(function(){
            //     setTimeout(checkNewData, 2000);
            // })
        } else {
            setTimeout(updateTableDataAssistiti, 1000);
        }
    }
}

function readAssistiti(toBeCompleted) {
    var xhr = new XMLHttpRequest();
    var url = "be/getassistiti.php";
    var activeUsca = sessionStorage.getItem("activeUsca");
    if(activeUsca == null){
        activeUsca = "ALL";
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                assistiti = result.data;
                toBeCompleted.assistiti = true;
                sessionStorage.setItem("assistiti", JSON.stringify(assistiti));
                sessionStorage.setItem("toBeCompleted", JSON.stringify(toBeCompleted));
                if (result.hasOwnProperty("lastRead")) {
                    sessionStorage.setItem("lastRead", result.lastRead);
                }
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
    xhr.send("lastRead=" + sessionStorage.getItem("lastRead")+"&activeUsca="+activeUsca);
}