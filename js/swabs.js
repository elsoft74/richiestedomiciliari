function showSwabs(swabs, user) {
    $("#mainSwabs").html("");
    // $("#users").fadeOut();
    // $(".requests-form-btn").fadeIn();
    // $(".users-form-btn").fadeOut();

    var table = new Tabulator("#mainSwabs", {
        data: swabs,           //load row data from array
        layout: "fitData",      //fit columns to width of table
        responsiveLayout: "hide",  //hide columns that dont fit on the table
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

                    return '<span class="material-symbols-outlined" style="color: green">edit</span>';
                },
            },
            {
                title: "", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canDeleteAssistito"), cellClick: checkUserPermission(user, "canDeleteAssistito") ? deleteElement : null, formatter: function (cell, formatterParams, onRendered) {

                    return '<span class="material-symbols-outlined" style="color: red">delete</span>';
                },
            },
            { title: "Cognome", field: "cognome", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Nome", field: "nome", editor: false },
            {
                title: "Nascita", field: "nascita", editor: false, formatter: "datetime", formatterParams: {
                    //inputFormat:"YYY-MM-DD HH:mm:ss",
                    outputFormat: "dd-MM-yyyy",
                    invalidPlaceholder: "(data non valida)",
                    timezone: "Europe/Rome",
                }
            },
            { title: "Codice Fiscale", field: "codiceFiscale", editor: false, hozAlign: "center", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Telefono", field: "telefono", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "e-mail", field: "email", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            { title: "Indirizzo", field: "indirizzo", editor: false, headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like" },
            {
                title: "Usca", field: "usca", editor: false, hozAlign: "center", formatter:"text", headerPopup: headerPopupFormatter, headerPopupIcon: '<span class="material-symbols-outlined">filter_alt</span>', headerFilter: emptyHeaderFilter, headerFilterFunc: "like"
            },
            {
                title: "Note", field: "noteAssistito", editor: false/*, formatter: "textarea" */, cellClick: cellPopupFormatterNoteAssistito, formatter: function (cell, formatterParams, onRendered) {
                    return (cell.getValue() == null) ? '' : '<span class="material-symbols-outlined">notes</span>';
                }
            },


            {
                title: "", width: 10, hozAlign: "center", editor: false, visible: checkUserPermission(user, "canCreateRequest"), cellClick: checkUserPermission(user, "canCreateRequest") ? newRequest : null, formatter: function (cell, formatterParams, onRendered) {

                    return '<span class="material-symbols-outlined" style="color: green">add</span>';
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
                title: "Programmato", field: "tamponeIsProgrammed", editor: false, hozAlign: "center", formatter: "tickCross"
            },
        ]
    });

    if (checkUserPermission(user, "canExport")) {
        let button = $("<button>").addClass("btn btn-primary btn-block swabs-form-btn").attr({ "id": "swabsDownLoadButton" }).html("Scarica tamponi");
        $("#menubuttons").append(button);
        document.getElementById("swabsDownLoadButton").addEventListener("click", function () {
            table.download("xlsx", "tamponi.xlsx", { sheetName: "Export" });
        });
    }
    localStorage.setItem("activity","requests");
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