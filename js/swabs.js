function showSwabs(swabs, user) {
    $("#mainSwabs").html("");
    // $(".users-form").hide();
    // $(".requests-form").hide();
    // $(".swabs-form").show();

    var table = new Tabulator("#mainSwabs", {
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
        // initialSort: [             //set the initial sort order of the data
        //     { column: "dataRic", dir: "asc" },
        // ],
        /*
        
        "idAssistito":"1",
         "nome":"IVO",
         "cognome":"PUGLIESE",
         "email":"elsoft74@gmail.com",
         "telefono":"3935397897",
         "indirizzo":"VIA DELLA LIBERTA' 15 - ROCCELLA JONICA (RC)",
         "codiceFiscale":"PGLVIO74M20H224C",
         "noteAssistito":"Inserimento di test",
         "nascita":"1974-08-20 00:00:00",
         "assistitoIsActive":"1",
         "tamponeIsActive":"1",
         "tamponeIsProgrammed":"0",
         "idTampone":"1",
         "dataEsecuzione":"2022-09-01 10:20:02",
         "dataConsigliata":"2022-09-06 10:20:02",
         "idUsca":"1",
         "usca":"Messina Nord",
         "created":"2022-09-03 10:20:20",
         "createdByNomeCognome":"1",
         "last_update":null,
         "lastUpdateByNomeCognome":null
        
        */
        columns: [                 //define the table columns

            { title: "#", field: "idAssistito", width: 10, editor: false, hozAlign: "center", visible: checkUserPermission(user, "canViewId") },

            {
                title: "", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canEditAssistito"), cellClick: checkUserPermission(user, "canEditAssistito") ? showAssistitoUpdate : null, formatter: function (cell, formatterParams, onRendered) {

                    return '<span class="material-icons-outlined" style="color: green">edit</span>';
                },
            },
            {
                title: "", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canDeleteAssistito"), cellClick: checkUserPermission(user, "canDeleteAssistito") ? deleteElement : null, formatter: function (cell, formatterParams, onRendered) {

                    return '<span class="material-icons-outlined" style="color: red">delete</span>';
                },
            },
            {
                title: "Note", field: "noteAssistito", editor: false/*, formatter: "textarea" */, cellClick: cellPopupFormatterNoteAssistito, formatter: function (cell, formatterParams, onRendered) {
                    return (cell.getValue() == null) ? '' : '<span class="material-icons-outlined">notes</span>';
                }
            },

            { title: "Cognome", field: "cognome", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Nome", field: "nome", editor: false },
            {
                title: "Nascita", field: "nascita", editor: false, formatter: "datetime", formatterParams: {
                    //inputFormat:"YYY-MM-DD HH:mm:ss",
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "(data non valida)",
                    timezone: "Europe/Rome",
                }
            },
            { title: "Codice Fiscale", field: "codiceFiscale", editor: false, hozAlign: "center", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Telefono", field: "telefono", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "e-mail", field: "email", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Indirizzo", field: "indirizzo", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            {
                title: "Usca", field: "usca", editor: false, hozAlign: "center", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },

            {
                title: "", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canCreateRequest"), cellClick: checkUserPermission(user, "canCreateRequest") ? changeSwabStatus : null, formatter: function (cell, formatterParams, onRendered) {

                    return '<span class="material-icons-outlined" style="color: green">edit</span>';
                },
            },

            { title: "#", field: "idTampone", editor: false, hozAlign: "center", visible: checkUserPermission(user, "canViewId") },
            {
                title: "Data Tampone", field: "dataEsecuzione", editor: false, hozAlign: "center", formatter: "datetime", formatterParams: {
                    //inputFormat:"YYY-MM-DD HH:mm:ss",
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "(data non valida)",
                    timezone: "Europe/Rome",
                }
            },
            {
                title: "Data Consigliata", field: "dataConsigliata", editor: false, hozAlign: "center", formatter: "datetime", formatterParams: {
                    //inputFormat:"YYY-MM-DD HH:mm:ss",
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "(data non valida)",
                    timezone: "Europe/Rome",
                }
            },
            {
                title: "Stato", field: "status", editor: false, hozAlign: "center", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-icons-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },
            {
                title: "", field: "idStatus", visible: false
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
    // localStorage.setItem("activity", "requests");
    $("#mainSwabs").hide();
    setTimeout(checkNewData, 200);
}

function readSwabs(toBeCompleted) {
    var table = Tabulator.findTable("#main")[0];
    var rowCount = 0;
    if (table != null && table != undefined) {
        rowCount = table.getDataCount();
    }
    if (rowCount == 0) {
        localStorage.setItem("lastRead", null);
    }
    let xhr = new XMLHttpRequest();
    let url = "be/getswabs.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let ready = false;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            result = JSON.parse(xhr.responseText);
            if (result.status == "OK") {
                swabs = result.data;
                toBeCompleted.swabs = true;
                if (result.hasOwnProperty("lastRead")) {
                    localStorage.setItem("lastRead", result.lastRead);
                }
                if (result.hasOwnProperty("deleted")) {
                    localStorage.setItem("deleted", result.deleted);
                }
                //setTimeout(checkIfAreUpdatedData, 1000);
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
    //xhr.send();
    xhr.send("lastRead=" + localStorage.getItem("lastRead"));
}

var changeSwabStatus = function (e, row) {
    buildUpdateTamponiForm();
    var element = row.getData();
    $("#idTamponeEdit").val(element.idTampone);
    $("#statusTamponeEdit").val(element.idStatus);
    $("#tamponeEdit").show();
}

function uploadSwabs(){
    buildUpLoadTamponiForm();
    $("#tamponeUpload").show();
}

function aggiornaTampone() {
    let lu = localStorage.getItem("ricdomloggeduser");
    if (lu != null) {
        loggedUser = JSON.parse(lu);
        let username = loggedUser.username;
        let token = "123456";
        let tampone = {};
        tampone.id = $("#idTamponeEdit").val();
        tampone.status = $("#statusTamponeEdit").val();
        tampone.lastUpdateBy = "" + loggedUser.id;


        let xhr = new XMLHttpRequest();
        let url = "be/updateSwab.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                result = JSON.parse(xhr.responseText);
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
        }
        xhr.send("username=" + username + "&token=" + token + "&tampone=" + JSON.stringify(tampone));
    }
}

function buildUpdateTamponiForm() {

        fun1 = "aggiornaTampone()";
        fun2 = "cleanTamponeEdit()";
        attrs = {
            idTampone: "idTamponeEdit",
            status: "statusTamponeEdit",
            
        }
        $("#tamponeUpload").html("");
        let modal = $("#tamponeUpload").addClass("modal")/*.addClass("fade")*/.attr({ "id": "tamponeUpload", "tabindex": "-1", "role": "dialog", "aria-labelledby": attrs.titleId, "aria-hidden": "true" });
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
        el = $("<input>").attr({ "type": "hidden", "id": attrs.idTampone });
        divFormGroup.append(el);
        el = $("<label>").attr({ "for": attrs.roleId }).text("Nuovo stato");
        divFormGroup.append(el);
        el = $("<select>").addClass('user-input-form').addClass("form-control").attr({ "id": attrs.status});
        if(statiTamponi!=null){
            statiTamponi.forEach(element => {
                let option = $("<option>").attr({ "value": element.id}).text(element.descrizione);
                el.append(option);
            });
        }
        divFormGroup.append(el);

        form.append(divFormGroup);

        modalBody.append(form);
        modalContent.append(modalBody);

        el = $("<button>").addClass("btn").addClass("btn-primary").text("Conferma").attr({ "onClick": fun1 });
        modalFooter.append(el);
        el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({ "onClick": fun2});
        modalFooter.append(el);
        modalContent.append(modalFooter);

        modalDialog.append(modalContent);
        modal.append(modalDialog);
    }

    function cleanTamponeEdit(){
        $("#idTamponeEdit").val('');
        $("#statusTamponeEdit").val('');
        $("#tamponeEdit").hide();
    }

    function getStatiTamponi(toBeCompleted) {
        let xhr = new XMLHttpRequest();
        let url = "be/getStatiTamponi.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);
                if (result.status == "OK") {
                    toBeCompleted.statiTamponi = true;
                    statiTamponi = result.data;
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

        fun1 = 'alert("carico");'
        fun2 = '$("#tamponeUpload").hide()';
        attrs = {
            status: "statusTamponeUpload",
            
        }
        $("#tamponeUpload").html("");
        let modal = $("#tamponeUpload").addClass("modal")/*.addClass("fade")*/.attr({ "id": "tamponeUpload", "tabindex": "-1", "role": "dialog", "aria-labelledby": attrs.titleId, "aria-hidden": "true" });
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
        el = $("<label>").attr({ "for": attrs.status }).text("Stato di default");
        divFormGroup.append(el);
        el = $("<select>").addClass('user-input-form').addClass("form-control").attr({ "id": attrs.status});
        if(statiTamponi!=null){
            statiTamponi.forEach(element => {
                let option = $("<option>").attr({ "value": element.id}).text(element.descrizione);
                el.append(option);
            });
        }
        divFormGroup.append(el);

        form.append(divFormGroup);

        modalBody.append(form);
        modalContent.append(modalBody);

        el = $("<button>").addClass("btn").addClass("btn-primary").text("Conferma").attr({ "onClick": fun1 });
        modalFooter.append(el);
        el = $("<button>").addClass("btn").addClass("btn-secondary").text("Annulla").attr({ "onClick": fun2});
        modalFooter.append(el);
        modalContent.append(modalFooter);

        modalDialog.append(modalContent);
        modal.append(modalDialog);
    }