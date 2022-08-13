function buildInsertForm(target) {

    let canBuild=false;
    switch(target){
        case "insert":
            tar="#insert";
            fun1="inserisci()";
            fun2="cleanInsert()";
            attrs={
                id:"id",
                nome:"nome",
                cognome:"cognome",
                codiceFiscale:"codiceFiscale",
                email:"email",
                numero:"numero",
                data2:"dataUltimaComunicazione",
                data1:"data",
                fase:"fase",
                motivo:"motivo",
                note:"note",
                titleId:"modalTitle",
                titleText:"Inserisci nuova richiesta"
            }
            canBuild=true;
            break;
        case "edit":
            tar="#edit";
            fun1="aggiorna()";
            fun2="cleanEdit()";
            attrs={
                id:"editId",
                nome:"editNome",
                cognome:"editCognome",
                codiceFiscale:"editCodiceFiscale",
                email:"editEmail",
                numero:"editNumero",
                data1:"editData",
                data2:"editDataUltimaComunicazione",
                fase:"editFase",
                motivo:"editMotivo",
                note:"editNote",
                titleId:"editModalTitle",
                titleText:"Modifica richiesta"
            }
            canBuild=true;
            break;
    }

    if (canBuild) {
        let modal = $(tar).addClass("modal")/*.addClass("fade")*/.attr({"id":target,"tabindex":"-1", "role":"dialog", "aria-labelledby":attrs.titleId, "aria-hidden":"true"});
        let modalDialog = $("<div>").addClass("modal-dialog").attr({"role":"document"});
        let modalContent = $("<div>").addClass("modal-content");
        let modalHeader = $("<div>").addClass("modal-header");
        let modalBody = $("<div>").addClass("modal-body");
        let modalFooter = $("<div>").addClass("modal-footer");
        
        let el = $("<h5>").addClass("modal-title").attr({"id":attrs.titleId}).html(attrs.titleText);
        modalHeader.append(el);
        // el=$("<botton>").addClass("close").attr({"data-dismiss":"modal", "aria-label":"Close","onClick":close(tar)}).html('<span aria-hidden="true">&times;</span>');
        // modalHeader.append(el);
        modalContent.append(modalHeader);

        let form = $("<form>");
        let divFormGroup = $("<div>").addClass("form-group");
        el = $("<input>").attr({ "type": "hidden", "id":attrs.id });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": "nome" }).text("Nome");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.nome });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": "cognome" }).text("Cognome");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.cognome });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": "codiceFiscale" }).text("Codice Fiscale");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.codiceFiscale });
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("form-group");
        el = $("<label>").attr({ "for": "email" }).text("e-mail");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "email", "id": attrs.email });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": "numero" }).text("Numero sanzione");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.numero });
        divFormGroup.append(el);
    
        let div4 = $("<div>").addClass("col").addClass("date");
        el = $("<label>").text("Data Ricezione istanza");
        div4.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "date", "id": attrs.data1 });
        div4.append(el);
        let div5 = $("<div>").addClass("input-group-addon");
        el = $("<span>").addClass("glyphicon glyphicon-th");
        div5.append(el);
        div4.append(div5);
        divFormGroup.append(div4);
        
        div4 = $("<div>").addClass("col").addClass("date");
        el = $("<label>").text("Data nostra risposta");
        div4.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "date", "id": attrs.data2 });
        div4.append(el);
        div5.append(el);
        div4.append(div5);
        divFormGroup.append(div4);
        
        
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("form-group");
        el = $("<label>").attr({ "for": "fase" }).text("Fase");
        divFormGroup.append(el);
        el = $("<select>").addClass("form-control").attr({ "id": attrs.fase });
        fasi.forEach(element => {
            let option = $("<option>").attr({ "value": element.id }).text(element.descrizione);
            el.append(option);
        });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": "motivo" }).text("Motivo");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.motivo });
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("form-group");
        el = $("<label>").attr({ "for": "note" }).text("Note");
        divFormGroup.append(el);
        el = $("<textarea>").addClass("form-control").attr({ "type": "text", "id": attrs.note });
        divFormGroup.append(el);
        form.append(divFormGroup);

        modalBody.append(form);
        modalContent.append(modalBody);

        el = $("<button>").addClass("btn").addClass("btn-primary").text("Conferma").attr({ "onClick": fun1 });
        modalFooter.append(el);
        el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({"onClick": fun2/*"data-dismiss":"modal"*/});
        modalFooter.append(el);
        modalContent.append(modalFooter);

        modalDialog.append(modalContent);
        modal.append(modalDialog);
    }
}

function cleanInsert() {
    $("#id").val('')
    $("#nome").val("");
    $("#cognome").val("");
    $("#codiceFiscale").val("");
    $("#email").val("");
    $("#numero").val("");
    $("#data").val("");
    $("#fase").val("");
    $("#motivo").val("");
    $("#note").val("");
    $("#insert").fadeOut();
}

function buildUserInsertForm(target) {

    let canBuild=false;
    switch(target){
        case "insertUser":
            tar="#insertUser";
            fun1="inserisciUser()";
            fun2="cleanUserInsert()";
            attrs={
                id:"idUser",
                nome:"nomeUser",
                cognome:"cognomeUser",
                username:"usernameUser",
                email:"emailUser",
                roleId:"roleIdUser",
                password:"passwordUser",
                isActive:"isActivedUser",
                titleId:"insertModalTitle",
                titleText:"Inserisci nuovo utente"
            }
            canBuild=true;
            break;
        case "editUser":
            tar="#editUser";
            fun1="aggiornaUser()";
            fun2="cleanUserEdit()";
            attrs={
                id:"idUser",
                nome:"nomeUser",
                cognome:"cognomeUser",
                username:"usernameUser",
                email:"emailUser",
                roleId:"roleIdUser",
                password:"passwordUser",
                isActive:"isActivedUser",
                titleId:"editModalTitle",
                titleText:"Modifica utente"
            }
            canBuild=true;
            break;
    }

    if (canBuild) {
        let modal = $(tar).addClass("modal")/*.addClass("fade")*/.attr({"id":target,"tabindex":"-1", "role":"dialog", "aria-labelledby":attrs.titleId, "aria-hidden":"true"});
        let modalDialog = $("<div>").addClass("modal-dialog").attr({"role":"document"});
        let modalContent = $("<div>").addClass("modal-content");
        let modalHeader = $("<div>").addClass("modal-header");
        let modalBody = $("<div>").addClass("modal-body");
        let modalFooter = $("<div>").addClass("modal-footer");
        
        let el = $("<h5>").addClass("modal-title").attr({"id":attrs.titleId}).html(attrs.titleText);
        modalHeader.append(el);
        modalContent.append(modalHeader);

        let form = $("<form>");
        let divFormGroup = $("<div>").addClass("form-group");
        el = $("<input>").attr({ "type": "hidden", "id":attrs.id });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.nome }).text("Nome");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.nome });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": attrs.cognome }).text("Cognome");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.cognome });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": attrs.username }).text("Nome utente");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.username });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.password }).text("Nuova Password");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.password });
        divFormGroup.append(el);
        form.append(divFormGroup);

        divFormGroup = $("<div>").addClass("form-group");
        el = $("<label>").attr({ "for": attrs.email }).text("e-mail");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "email", "id": attrs.email });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": attrs.roleId }).text("Ruolo");
        divFormGroup.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.roleId });
        divFormGroup.append(el);
    
        let div4 = $("<div>").addClass("col");
        el = $("<label>").attr({ "for": attrs.isActive }).text("Attivo");
        div4.append(el);
        el = $("<input>").addClass("form-control").attr({ "type": "text", "id": attrs.isActive });
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
        el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({"onClick": fun2/*"data-dismiss":"modal"*/});
        modalFooter.append(el);
        modalContent.append(modalFooter);

        modalDialog.append(modalContent);
        modal.append(modalDialog);
    }
}

function cleanUserInsert() {
    $("#idUser").val('');
    $("#nomeUser").val('');
    $("#cognomeUser").val('');
    $("#usernameUser").val('');
    $("#emailUser").val('');
    $("#roleIdUser").val('');
    $("#isActivedUser").val('');
    $("#insertUser").fadeOut();
}

function buildAssistitoInsertForm(target) {

    let canBuild=false;
    switch(target){
        case "insertAssistito":
            tar="#insertAssistito";
            fun1="inserisciAssistito()";
            fun2="cleanAssistitoInsert()";
            attrs={
                id:"idAssistito",
                nome:"nomeAssistito",
                cognome:"cognomeAssistito",
                codiceFiscale:"codiceFiscaleAssistito",
                telefono:"telefonoAssistito",
                email:"emailAssistito",
                indirizzo:"indirizzoAssistito",
                note:"noteAssistito",
                titleId:"insertAssistitoModalTitle",
                titleText:"Inserisci nuovo assistito"
            }
            canBuild=true;
            break;
        case "editAssistito":
            tar="#editAssistito";
            fun1="aggiornaAssistito()";
            fun2="cleanAssistitoEdit()";
            attrs={
                id:"idAssistitoEdit",
                nome:"nomeAssistitoEdit",
                cognome:"cognomeAssistitoEdit",
                codiceFiscale:"codiceFiscaleAssistitoEdit",
                telefono:"telefonoAssistitoEdit",
                email:"emailAssistitoEdit",
                indirizzo:"indirizzoAssistitoEdit",
                note:"noteAssistitoEdit",
                titleId:"editAssistitoModalTitle",
                titleText:"Modifica assistito"
            }
            canBuild=true;
            break;
    }

    if (canBuild) {
        let modal = $(tar).addClass("modal")/*.addClass("fade")*/.attr({"id":target,"tabindex":"-1", "role":"dialog", "aria-labelledby":attrs.titleId, "aria-hidden":"true"});
        let modalDialog = $("<div>").addClass("modal-dialog").attr({"role":"document"});
        let modalContent = $("<div>").addClass("modal-content");
        let modalHeader = $("<div>").addClass("modal-header");
        let modalBody = $("<div>").addClass("modal-body");
        let modalFooter = $("<div>").addClass("modal-footer");
        
        let el = $("<h5>").addClass("modal-title").attr({"id":attrs.titleId}).html(attrs.titleText);
        modalHeader.append(el);
        modalContent.append(modalHeader);

        let form = $("<form>");
        let divFormGroup = $("<div>").addClass("form-group");
        el = $("<input>").attr({ "type": "hidden", "id":attrs.id });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.nome }).text("Nome");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.nome });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": attrs.cognome }).text("Cognome");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.cognome });
        divFormGroup.append(el);
    
        el = $("<label>").attr({ "for": attrs.codiceFiscale }).text("Codice Fiscale");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "text", "id": attrs.codiceFiscale });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.telefono }).text("Telefono");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "tel", "id": attrs.telefono, "pattern":"[0-9]{10}" });
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
        el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({"onClick": fun2/*"data-dismiss":"modal"*/});
        modalFooter.append(el);
        modalContent.append(modalFooter);

        modalDialog.append(modalContent);
        modal.append(modalDialog);
    }
}

function cleanAssistitoInsert() {
    $(".assitito-input-form").val('');
    $("#insertAssistito").fadeOut();
}