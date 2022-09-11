function buildAssistitoInsertForm(target) {

    let canBuild=false;
    switch(target){
        case "insertAssistito":
            tar="#insertAssistito";
            fun1="inserisciAssistito()";
            fun2="cleanAssistitoInsert()";
            attrs={
                id:"idNuovoAssistito", // necessario per evitare id duplicati con la gestione richieste
                idUsca:"idUscaAssistito",
                nome:"nomeAssistito",
                cognome:"cognomeAssistito",
                codiceFiscale:"codiceFiscaleAssistito",
                telefono:"telefonoAssistito",
                email:"emailAssistito",
                indirizzo:"indirizzoAssistito",
                note:"noteAssistito",
                nascita:"nascitaAssistito",
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
                id:"idAssistito_Edit", // necessario per evitare id duplicati con la gestione richieste
                idUsca:"idUscaAssistitoEdit",
                nome:"nomeAssistitoEdit",
                cognome:"cognomeAssistitoEdit",
                codiceFiscale:"codiceFiscaleAssistitoEdit",
                telefono:"telefonoAssistitoEdit",
                email:"emailAssistitoEdit",
                indirizzo:"indirizzoAssistitoEdit",
                note:"noteAssistitoEdit",
                nascita:"nascitaAssistitoEdit",
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

        el = $("<label>").attr({ "for": attrs.nascita }).text("Data di nascita");
        divFormGroup.append(el);
        el = $("<input>").addClass('assitito-input-form').addClass("form-control").attr({ "type": "date", "id": attrs.nascita });
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

        el = $("<label>").attr({ "for": attrs.idUsca }).text("USCA di competenza");
        divFormGroup.append(el);
        el = $("<select>").addClass("form-richiesta").addClass("form-control").attr({"id": attrs.idUsca });
        if(usca!=null){
            usca.forEach(element => {
                let option = $("<option>").attr({ "value": element.id}).text(element.descrizione);
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
        el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({"onClick": fun2/*"data-dismiss":"modal"*/});
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
        assistito.telefono = $("#telefonoAssistito").val();
        assistito.email = $("#emailAssistito").val();
        assistito.indirizzo = $("#indirizzoAssistito").val().toUpperCase();
        assistito.note = $("#noteAssistito").val();
        assistito.nascita = $("#nascitaAssistito").val();
        assistito.idUsca = $("#idUscaAssistito").val();
        let err="";
        err+=(assistito.nome=="")?"Nome vuoto\n":"";
        err+=(assistito.cognome=="")?"Cognome vuoto\n":"";
        err+=(assistito.codiceFiscale=="")?"Codice Fiscale vuoto\n":"";
        err+=(assistito.email=="" && assistito.telefono=="")?"E-mail e Telefono vuoti\n":"";
        err+=(assistito.indirizzo=="")?"Indirizzo vuoto\n":"";
        err+=(assistito.nascita=="")?"Data di nascita non valida\n":"";
        if (err=="") {
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    result = JSON.parse(xhr.responseText);
                    if(result.status=="OK"){
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
        assistito.telefono = $("#telefonoAssistitoEdit").val();
        assistito.email = $("#emailAssistitoEdit").val();
        assistito.indirizzo = $("#indirizzoAssistitoEdit").val().toUpperCase();
        assistito.note = $("#noteAssistitoEdit").val();
        assistito.nascita = $("#nascitaAssistitoEdit").val();
        assistito.idUsca = $("#idUscaAssistitoEdit").val();
        let err="";
        err+=(assistito.nome=="")?"Nome vuoto\n":"";
        err+=(assistito.cognome=="")?"Cognome vuoto\n":"";
        err+=(assistito.codiceFiscale=="")?"Codice Fiscale vuoto\n":"";
        err+=(assistito.email=="" && assistito.telefono=="")?"E-mail e Telefono vuoti\n":"";
        err+=(assistito.indirizzo=="")?"Indirizzo vuoto\n":"";
        err+=(assistito.idUsca==null)?"USCA non selezionata\n":"";
        err+=(assistito.nascita=="")?"Data di nascita non valida\n":"";
        if (err=="") {
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    result = JSON.parse(xhr.responseText);
                    if(result.status=="OK"){
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
    $("#idAssistitoEdit").val(element.idAssistito);
    $("#idUscaAssistitoEdit").val(element.idUsca);
    $("#nomeAssistitoEdit").val(element.nome);
    $("#cognomeAssistitoEdit").val(element.cognome);
    $("#codiceFiscaleAssistitoEdit").val(element.codiceFiscale);
    $("#telefonoAssistitoEdit").val(element.telefono);
    $("#emailAssistitoEdit").val(element.email);
    $("#indirizzoAssistitoEdit").val(element.indirizzo);
    $("#noteAssistitoEdit").val(element.noteAssistito);
    $("#nascitaAssistitoEdit").val(((new luxon.DateTime.fromSQL(element.nascita)).toFormat("yyyy-MM-dd")));
}

function buildAssistitoEditForm(target){
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