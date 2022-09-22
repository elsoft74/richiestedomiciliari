function buildInsertForm(target) {

    let canBuild = false;
    switch (target) {
        case "insert":
            tar = "#insert";
            fun1 = "inserisci()";
            fun2 = "cleanInsert()";
            attrs = {
                idAssistito: "idAssistito",
                nome: "nome",
                cognome: "cognome",
                email: "email",
                indirizzo: "indirizzo",
                codiceFiscale: "codiceFiscale",
                noteAssistito: "noteAssistito",
                telefono1: "telefono1",
                telefono2: "telefono2",
                telefono3: "telefono3",
                idRichiesta: "idRichiesta",
                idTipologia: "idTipologia",
                idPriorita: "idPriorita",
                data: "data",
                noteRichiesta: "noteRichiesta",
                noteRichiestaText: "Note",
                pulsante: "aggiungiNota",
                pulsanteText: "Aggiungi nota",
                titleId: "modalTitle",
                titleText: "Inserisci nuova richiesta"
            }
            canBuild = true;
            break;
        case "edit":
            tar = "#edit";
            fun1 = "aggiorna()";
            fun2 = "cleanEdit()";
            attrs = {
                idAssistito: "idAssistitoEdit",
                nome: "nomeEdit",
                cognome: "cognomeEdit",
                email: "emailEdit",
                indirizzo: "indirizzoEdit",
                codiceFiscale: "codiceFiscaleEdit",
                noteAssistito: "noteAssistitoEdit",
                telefono1: "telefono1Edit",
                telefono2: "telefono2Edit",
                telefono3: "telefono3Edit",
                idRichiesta: "idRichiestaEdit",
                idTipologia: "idTipologiaEdit",
                idPriorita: "idPrioritaEdit",
                data: "dataEdit",
                titleId: "editModalTitle",
                titleText: "Modifica richiesta"
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
        // el=$("<botton>").addClass("close").attr({"data-dismiss":"modal", "aria-label":"Close","onClick":close(tar)}).html('<span aria-hidden="true">&times;</span>');
        // modalHeader.append(el);
        modalContent.append(modalHeader);

        let form = $("<form>");
        let divFormGroup = $("<div>").addClass("form-group");
        el = $("<input>").attr({ "type": "hidden", "id": attrs.idAssistito });
        divFormGroup.append(el);
        el = $("<input>").attr({ "type": "hidden", "id": attrs.idRichiesta });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.nome }).text("Nome");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.nome }).prop("readonly", true);
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.cognome }).text("Cognome");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.cognome }).prop("readonly", true);
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.codiceFiscale }).text("Codice Fiscale");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.codiceFiscale }).prop("readonly", true);
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("form-group");
        el = $("<label>").attr({ "for": attrs.email }).text("e-mail");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "email", "id": attrs.email }).prop("readonly", true);
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.telefono1 }).text("Telefono 1");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.telefono1 }).prop("readonly", true);
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.telefono2 }).text("Telefono 2");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.telefono2 }).prop("readonly", true);
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.telefono3 }).text("Telefono 3");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.telefono3 }).prop("readonly", true);
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.idTipologia }).text("Tipo di richiesta");
        divFormGroup.append(el);
        el = $("<select>").addClass("form-richiesta").addClass("form-control").attr({ "id": attrs.idTipologia });
        if (tipologie != null) {
            tipologie.forEach(element => {
                let option = $("<option>").attr({ "value": element.id }).text(element.descrizione);
                el.append(option);
            });
        }
        divFormGroup.append(el);

        el = $("<label>").attr({ "for": attrs.idPriorita }).text("Priorità");
        divFormGroup.append(el);
        el = $("<select>").addClass("form-richiesta").addClass("form-control").attr({ "id": attrs.idPriorita });
        if (priorita != null) {
            priorita.forEach(element => {
                let option = $("<option>").attr({ "value": element.id }).text(element.descrizione);
                el.append(option);
            });
        }
        divFormGroup.append(el);


        let div4 = $("<div>").addClass("col").addClass("date");
        el = $("<label>").text("Data Programmazione");
        div4.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "date", "id": attrs.data });
        div4.append(el);
        let div5 = $("<div>").addClass("input-group-addon");
        el = $("<span>").addClass("glyphicon glyphicon-th");
        div5.append(el);
        div4.append(div5);
        divFormGroup.append(div4);



        form.append(divFormGroup);

        // if (attrs.hasOwnProperty("pulsante")) {
        //     divFormGroup = $("<div>").addClass("form-group");
        //     el = $("<button>").addClass("btn").addClass("btn-primary").text(attrs.pulsanteText).attr({ "id": attrs.pulsante, "onClick": fun3 });
        //     divFormGroup.append(el);
        //     form.append(divFormGroup);
        // }

        if (attrs.hasOwnProperty("noteRichiesta")) {
            el = $("<label>").attr({ "for": attrs.noteRichiesta }).text(attrs.noteRichiestaText);
            divFormGroup.append(el);
            el = $("<textarea>").addClass("form-richiesta").addClass("form-control").attr({ "type": "hidden", "id": attrs.noteRichiesta });
            divFormGroup.append(el);
        }
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

function cleanInsert() {
    $(".form-richiesta").val('');
    $("#insert").hide();
}