function showMenu(user) {
    $("#menu").html("").addClass("navbar");
    if (user != null) {
        var actualUsca = sessionStorage.getItem("activeUsca");
        var row = $("<div>");//.addClass("row");
        var div1 = $("<div>");//.addClass("col-9");
        var span = $("<span>");//.addClass("col-2");
        //var div3 = $("<div>");//.addClass("col-1");

        var exit = $("<button>").addClass("btn middle btn-primary btn-block menu-button").attr({ "onClick": "logout()" }).text("Esci");
        var el = $("<span>").addClass("material-icons-outlined").addClass("middle");
        el.text("logout");
        exit.append(el);
        div1.attr("id", "menubuttons");
        span.attr("id", "user");
        //div3.attr("id", "loginbutton");
        
        span.text(user.nome + " " + user.cognome + ((actualUsca!=null)?(" ("+getUscaNameFromId(actualUsca)+")"):""));
        //div3.append(span);
        
        var info = $("<a>").addClass("btn middle btn-primary btn-block menu-button").attr({ "href": "guide/PresentazioneGenerale.pdf","target":"_blank" }).text("Info");
        el = $("<span>").addClass("material-icons-outlined").addClass("middle");
        el.text("info");
        info.append(el);
        // div3.append(info);
        // div3.append(exit);
        
        button = $("<button>").addClass("btn").addClass('btn-primary btn-block assistiti-form menu-button').attr({"onClick":'$("#insertAssistito").modal("show")','id':'requestInsertButton'}).text("Nuovo Paziente");
        div1.append(button);
        if(user.permissions.canCreateUser){
            button = $("<button>").addClass('btn btn-primary btn-block users-form menu-button').attr({"onClick":'$("#insertUser").modal("show")','id':'userInsertButton'}).text("Nuovo Utente");
            div1.append(button);
            button = $("<button>").addClass('btn btn-primary btn-block home-form assistiti-form swabs-form requests-form menu-button').attr({"onClick":'window.open("users.php","_self")','id':'showUserButton'}).text("Utenti");
            div1.append(button);
        }
        var mostraStorico = JSON.parse(sessionStorage.getItem("mostraStorico"));
        if (mostraStorico==null) {
            mostraStorico = false;
        }
        // button = $("<button>").addClass('btn btn-primary btn-block home-form requests-form swabs-form users-form menu-button').attr({"onClick":'window.open("assistiti.php","_self")','id':'showRequestsButton'}).text("Elenco Pazienti").hide();
        // div1.append(button);
        button = $("<button>").addClass('btn btn-primary btn-block home-form assistiti-form swabs-form users-form menu-button').attr({"onClick":'window.open("richieste.php","_self")','id':'showRequestsButton'}).text("Elenco Attività").hide();
        div1.append(button);
        button = $("<button>").addClass('btn btn-primary btn-block home-form assistiti-form users-form requests-form menu-button').attr({"onClick":'window.open("index.php","_self")','id':'mostraTamponiButton'}).text("Pazienti Positivi").hide();
        div1.append(button);
        if(user.permissions.canUploadSwabs){
            button = $("<button>").addClass('btn btn-primary btn-block swabs-form menu-button').attr({"onClick":'uploadSwabs()','id':'caricaTamponiButton'}).text("Carica Tamponi");
            div1.append(button);
        }
        //button = $("<button>").addClass('btn btn-warning btn-block requests-form menu-button').attr({"onClick":'mostraStorico()','id':'mostraStoricoButton'}).text(mostraStorico?"Solo Attuali":"Tutte").hide();
        //div1.append(button);
        if(user.permissions.canChangeUsca){
            button = $("<button>").addClass('btn btn-primary btn-block requests-form assistiti-form swabs-form menu-button').attr({"onClick":'buildChangeUsca()','id':'cambiaTeam'}).text("Cambia Team");
            div1.append(button);
        }
        div1.append(span);
        div1.append(info);
        div1.append(exit);
        row.append(div1);
        //row.append(div3);
        $("#menu").append(row);
    }
}

function mostraStorico(){
    var mostraStorico = JSON.parse(sessionStorage.getItem("mostraStorico"));
        if (mostraStorico==null) {
            mostraStorico = false;
        } else {
            mostraStorico = !mostraStorico;
        }
    sessionStorage.setItem("mostraStorico",mostraStorico);
    location.reload();
}

function getUscaNameFromId(id){
    var usca = JSON.parse(sessionStorage.getItem("usca"));
    var out = "";
    for (var i=0; i<usca.length;i++){
        if (usca[i].id==id){
            out = usca[i].descrizione;
        }
    }
    // usca.forEach(element => {
    //     if (element.id==id){
    //         return element.descrizione;
    //     }
    // });
    return out;
}
