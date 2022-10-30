function buildInsertForm() {

   var user = JSON.parse(sessionStorage.getItem("ricdomloggeduser"));
    if (user != null) {
        var tar = "#insert";
        var fun1 = "";// inserisci() - aggiorna()
        var fun2 = "";// cleanInsert()- cleanEdit()
        var fun3 = "confirmAndArchive()";
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
            idUsca: "idUsca",
            nascita: "nascita",
            uscaText: "Team di competenza",
            idRichiesta: "idRichiesta",
            idTipologia: "idTipologia",
            idPriorita: "idPriorita",
            data: "data",
            noteRichiesta: "noteRichiesta",
            noteRichiestaText: "Note",
            nuovaNotaRichiesta: "nuovaNotaRichiesta",
            nuovaNotaRichiestaText: "Nuova nota",
            pulsante: "aggiungiNota",
            pulsanteText: "Aggiungi nota",
            titleId: "modalTitle",
            titleText: "Inserisci nuova richiesta",
            stati: "statiAttuali",
            statiText: "Attività svolte",
            nuovoStato: "nuovoStato",
            nuovoStatoText: "Cosa sto facendo",
            mostraNoteButton: "mostraNoteButton",
            idTamponePartenza: "idTamponePartenza",
            isArchived: "isArchived",
            noteRichiestaAttuali: "noteRichiestaAttuali",
            action: "actionType",
            idButton1: "insertFormButton1",
            idButton2: "insertFormButton2",
            idButton3: "insertFormButton3",
            indirizzo:"indirizzo"
        }
        var modal = $("#insert").addClass("modal")/*.addClass("fade")*/.attr({ "id": "insert", "tabindex": "-1", "role": "dialog", "aria-labelledby": attrs.titleId, "aria-hidden": "true" });
        var modalDialog = $("<div>").addClass("modal-dialog modal-lg").attr({ "role": "document" });
        var modalContent = $("<div>").addClass("modal-content");
        // var modalHeader = $("<div>").addClass("modal-header");
        var modalBody = $("<div>").addClass("modal-body");
        var modalFooter = $("<div>").addClass("modal-footer");

        // var el = $("<h5>").addClass("modal-title").attr({ "id": attrs.titleId }).html(attrs.titvarext);
        // modalHeader.append(el);
        // modalContent.append(modalHeader);

        var form = $("<form>").addClass("row g-3");
        var divFormGroup = $("<div>").addClass("col-md-12");
        var el = $("<input>").attr({ "type": "hidden", "id": attrs.idAssistito });
        divFormGroup.append(el);
        el = $("<input>").attr({ "type": "hidden", "id": attrs.idRichiesta });
        divFormGroup.append(el);
        if (user.permissions.caChangeUsca) {
            el = $("<input>").attr({ "type": "hidden", "id": attrs.idUsca });
            divFormGroup.append(el);
        }
        el = $("<input>").addClass("form-richiesta").attr({ "type": "hidden", "id": attrs.idTamponePartenza });
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").attr({ "type": "hidden", "id": attrs.isArchived, "value": false });
        divFormGroup.append(el);
        form.append(divFormGroup);
        el = $("<input>").addClass("form-richiesta").attr({ "type": "hidden", "id": attrs.noteRichiestaAttuali, "value": "[{}]" });
        divFormGroup.append(el);
        form.append(divFormGroup);
        el = $("<input>").addClass("form-richiesta").attr({ "type": "hidden", "id": attrs.action, "value": "" });
        divFormGroup.append(el);
        form.append(divFormGroup);
        el = $("<input>").addClass("form-richiesta").attr({ "type": "hidden", "id": attrs.noteAssistito, "value": "" });
        divFormGroup.append(el);
        form.append(divFormGroup);
        divFormGroup = $("<div>").addClass("col-md-2");
        el = $("<label>").attr({ "for": attrs.nome }).text("Nome");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.nome })/*.prop("readonly", true)*/;
        divFormGroup.append(el);
        form.append(divFormGroup);
        divFormGroup = $("<div>").addClass("col-md-3");
        el = $("<label>").attr({ "for": attrs.cognome }).text("Cognome");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.cognome })
        divFormGroup.append(el);
        form.append(divFormGroup);
        divFormGroup = $("<div>").addClass("col-md-3");
        el = $("<label>").attr({ "for": attrs.nascita }).text("Nascita");
        var div4 = $("<div>").addClass("col").addClass("date");
        el = $("<label>").text("Nascita").attr({"for":attrs.nascita});
        div4.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "date", "id": attrs.nascita });
        div4.append(el);
        var div5 = $("<div>").addClass("input-group-addon");
        el = $("<span>").addClass("glyphicon glyphicon-th");
        div5.append(el);
        div4.append(div5);
        divFormGroup.append(div4);
        form.append(divFormGroup);
        divFormGroup = $("<div>").addClass("col-md-4");
        el = $("<label>").attr({ "for": attrs.codiceFiscale }).text("Codice Fiscale");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.codiceFiscale })/*.prop("readonly", true)*/;
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("col-md-12");
        el = $("<label>").attr({ "for": attrs.indirizzo }).text("Indirizzo");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.indirizzo })/*.prop("readonly", true)*/;
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("col-md-2");
        el = $("<label>").attr({ "for": attrs.telefono1 }).text("Telefono 1");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.telefono1 })/*.prop("readonly", true)*/;
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("col-md-2");
        el = $("<label>").attr({ "for": attrs.telefono2 }).text("Telefono 2");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.telefono2 })/*.prop("readonly", true)*/;
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("col-md-2");
        el = $("<label>").attr({ "for": attrs.telefono3 }).text("Telefono 3");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "text", "id": attrs.telefono3 })/*.prop("readonly", true)*/;
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("col-md-6");
        el = $("<label>").attr({ "for": attrs.email }).text("e-mail");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "email", "id": attrs.email })/*.prop("readonly", true)*/;
        divFormGroup.append(el);
        form.append(divFormGroup);

        if (!user.permissions.caChangeUsca) {
            divFormGroup = $("<div>").addClass("col-md-12");
            el = $("<label>").attr({ "for": attrs.idUsca }).text(attrs.uscaText);
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
            form.append(divFormGroup);
        }
        divFormGroup = $("<div>").addClass("col-md-12");
        el = $("<label>").attr({ "for": attrs.nuovoStato }).text(attrs.nuovoStatoText);
        divFormGroup.append(el);
        el = $("<div>").attr({ "id": attrs.nuovoStato });
        var statiAttivita = JSON.parse(sessionStorage.getItem("statiAttivita"));
        if (statiAttivita != null) {
            statiAttivita.forEach(element => {
                let input = $("<input>").attr({ "id": attrs.stati + element.id, "type": "checkbox", "autocomplete": "off", "name": "nuoviStati", "value": element.id }).addClass("btn-check");
                let label = $("<label>").addClass("btn btn-outline-primary").attr({ "for": attrs.stati + element.id }).text(element.descrizione);
                el.append(input);
                el.append(label);
            });
        }
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("col-md-12 verticalScrollableList");
        // el = $("<label>").attr({ "for": attrs.stati }).text(attrs.statiText);
        // divFormGroup.append(el);
        el = $("<table>").addClass("form-richiesta activityNoteColumn").addClass("form-control").attr({ "id": attrs.stati });

        divFormGroup.append(el);
        form.append(divFormGroup);

        el = $("<label>").text("Cosa sto programmando").attr({"for":"datiNuovaRichiesta"});
        form.append(el);
        divFormGroup = $("<div>").attr({"id":"datiNuovaRichiesta"}).addClass("col-md-4");
        div4 = $("<div>").addClass("col").addClass("date");
        el = $("<label>").text("Data Programmazione");
        div4.append(el);
        el = $("<input>").addClass("form-richiesta").addClass("form-control").attr({ "type": "date", "id": attrs.data });
        div4.append(el);
        div5 = $("<div>").addClass("input-group-addon");
        el = $("<span>").addClass("glyphicon glyphicon-th");
        div5.append(el);
        div4.append(div5);
        divFormGroup.append(div4);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("col-md-4");
        el = $("<label>").attr({ "for": attrs.idTipologia }).text("Tipo di attività");
        divFormGroup.append(el);
        el = $("<select>").addClass("form-richiesta").addClass("form-control").attr({ "id": attrs.idTipologia });
        var tipologie = JSON.parse(sessionStorage.getItem("tipologie"));
        let option = $("<option>").attr({ "value": "" }).text("");
        el.append(option);
        if (tipologie != null) {
            tipologie.forEach(element => {
                option = $("<option>").attr({ "value": element.id }).text(element.descrizione);
                el.append(option);
            });
        }
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("col-md-4");
        el = $("<label>").attr({ "for": attrs.idPriorita }).text("Priorità");
        divFormGroup.append(el);
        el = $("<select>").addClass("form-richiesta").addClass("form-control").attr({ "id": attrs.idPriorita });
        var priorita = JSON.parse(sessionStorage.getItem("priorita"));
        option = $("<option>").attr({ "value": "" }).text("");
        el.append(option);
        if (priorita != null) {
            priorita.forEach(element => {
                option = $("<option>").attr({ "value": element.id }).text(element.descrizione);
                el.append(option);
            });
        }
        divFormGroup.append(el);
        form.append(divFormGroup);

        var div = $("<div>").addClass("col-md-12");
        el = $("<button>").addClass("btn btn-primary").text("Mostra note").attr({ "type": "button", "id": attrs.mostraNoteButton, "onClick": "mostraNote()" });
        div.append(el);
        form.append(div);

        var divNote = $("<div>").addClass("note");
        divFormGroup = $("<div>").addClass("col-md-12");
        if (attrs.hasOwnProperty("noteRichiesta")) {
            el = $("<label>").attr({ "for": attrs.noteRichiesta }).text(attrs.noteRichiestaText);
            divFormGroup.append(el);
            el = $("<table>").addClass("form-richiesta activityNoteColumn").addClass("form-control").attr({ "type": "hidden", "id": attrs.noteRichiesta });
            divFormGroup.append(el);
        }
        divNote.append(divFormGroup);
        divFormGroup = $("<div>").addClass("col-md-12");
        if (attrs.hasOwnProperty("nuovaNotaRichiesta")) {
            el = $("<label>").attr({ "for": attrs.nuovaNotaRichiesta }).text(attrs.nuovaNotaRichiestaText);
            divFormGroup.append(el);
            el = $("<textarea>").addClass("form-richiesta").addClass("form-control").attr({ "type": "hidden", "id": attrs.nuovaNotaRichiesta });
            divFormGroup.append(el);
        }
        divNote.append(divFormGroup);
        form.append(divNote);
        modalBody.append(form);
        modalContent.append(modalBody);

        el = $("<button>").addClass("btn").addClass("btn-warning").text("Salva ed Archivia").attr({ "id": attrs.idButton3, "onClick": fun3 });
        modalFooter.append(el);
        el = $("<button>").addClass("btn").addClass("btn-primary").text("Programma").attr({ "id": attrs.idButton1, "onClick": fun1 });
        modalFooter.append(el);
        el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({ "id": attrs.idButton2, "onClick": fun2/*"data-dismiss":"modal"*/ });
        modalFooter.append(el);
        modalContent.append(modalFooter);

        modalDialog.append(modalContent);
        modal.append(modalDialog);

    }
}

    function cleanInsert() {
        $(".form-richiesta").val('');
        $("input[name='nuoviStati']").prop("checked", false);
        $("#insert").modal("hide");
    }

    function mostraNote() {
        $(".note").fadeIn();
        $("button[id^=mostraNoteButton]").text("Nascondi note").attr({ "onClick": "nascondiNote()" });
    }

    function nascondiNote() {
        $(".note").fadeOut();
        $("button[id^=mostraNoteButton]").text("Mostra note").attr({ "onClick": "mostraNote()" });
    }
