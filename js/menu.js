function showMenu(user) {
    $("#menu").html("").addClass("navbar");
    if (user != null) {
        var row = $("<div>").addClass("row");
        var div1 = $("<div>").addClass("col-9");
        var div2 = $("<div>").addClass("col-2");
        var div3 = $("<div>").addClass("col-1");

        var button = $("<button>").addClass("btn middle btn-primary btn-block menu-button").attr({ "onClick": "logout()" }).text("Esci");
        var el = $("<span>").addClass("material-icons-outlined").addClass("middle");
        el.text("logout");
        button.append(el);
        div1.attr("id", "menubuttons");
        div2.attr("id", "user");
        div3.attr("id", "loginbutton");
        div3.append(button);
        div2.text(user.nome + " " + user.cognome);
        button = $("<button>").addClass("btn").addClass('btn-primary btn-block assistiti-form menu-button').attr({"onClick":'$("#insertAssistito").show()','id':'requestInsertButton'}).text("Nuovo Paziente");
        div1.append(button);
        if(user.permissions.canCreateUser){
            button = $("<button>").addClass('btn btn-primary btn-block users-form menu-button').attr({"onClick":'$("#insertUser").show()','id':'userInsertButton'}).text("Nuovo Utente");
            div1.append(button);
            button = $("<button>").addClass('btn btn-primary btn-block home-form assistiti-form swabs-form requests-form menu-button').attr({"onClick":'window.open("users.php","_self")','id':'showUserButton'}).text("Utenti");
            div1.append(button);
        }
        var mostraStorico = JSON.parse(sessionStorage.getItem("mostraStorico"));
        if (mostraStorico==null) {
            mostraStorico = false;
        }
        button = $("<button>").addClass('btn btn-primary btn-block home-form requests-form swabs-form users-form menu-button').attr({"onClick":'window.open("assistiti.php","_self")','id':'showRequestsButton'}).text("Elenco Pazienti").hide();
        div1.append(button);
        button = $("<button>").addClass('btn btn-primary btn-block home-form assistiti-form swabs-form users-form menu-button').attr({"onClick":'window.open("richieste.php","_self")','id':'showRequestsButton'}).text("Elenco Attività").hide();
        div1.append(button);
        button = $("<button>").addClass('btn btn-primary btn-block home-form assistiti-form users-form requests-form menu-button').attr({"onClick":'window.open("index.php","_self")','id':'mostraTamponiButton'}).text("Pazienti Positivi").hide();
        div1.append(button);
        if(user.permissions.canUploadSwabs){
            button = $("<button>").addClass('btn btn-primary btn-block swabs-form menu-button').attr({"onClick":'uploadSwabs()','id':'caricaTamponiButton'}).text("Carica Tamponi");
            div1.append(button);
        }
        button = $("<button>").addClass('btn btn-warning btn-block requests-form menu-button').attr({"onClick":'mostraStorico()','id':'mostraStoricoButton'}).text(mostraStorico?"Solo Attuali":"Tutte").hide();
        div1.append(button);
        row.append(div1);
        row.append(div2);
        row.append(div3);
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
