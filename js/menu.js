function showMenu(user) {
    $("#menu").html("");
    if (user != null) {
        let activity = localStorage.getItem("activity");
        let row = $("<div>").addClass("row");
        let div1 = $("<div>").addClass("col-10");
        let div2 = $("<div>").addClass("col-1");
        let div3 = $("<div>").addClass("col-1");
        let button = $("<button>").addClass("btn").addClass("middle").addClass("btn-primary").addClass("btn-block").attr({ "onClick": "logout()" }).text("Esci");
        let el = $("<span>").addClass("material-icons-outlined").addClass("middle");
        el.text("logout");
        button.append(el);
        div1.attr("id", "menubuttons");
        div2.attr("id", "user");
        div3.attr("id", "loginbutton");
        div3.append(button);
        div2.text(user.nome + " " + user.cognome);
        button = $("<button>").addClass("btn").addClass("btn-primary").addClass("btn-block").addClass('requests-form').attr({"onClick":'$("#insertAssistito").show()','id':'requestInsertButton'}).text("Nuovo Assistito");
        div1.append(button);
        if(user.permissions.canCreateUser){
            button = $("<button>").addClass('btn btn-primary btn-block users-form').attr({"onClick":'$("#insertUser").show()','id':'userInsertButton'}).text("Nuovo Utente");
            div1.append(button);
            button = $("<button>").addClass('btn btn-primary btn-block swabs-form requests-form').attr({"onClick":'showUsers()','id':'showUserButton'}).text("Utenti");
            div1.append(button);
        }
        var mostraStorico = JSON.parse(localStorage.getItem("mostraStorico"));
        if (mostraStorico==null) {
            mostraStorico = false;
        }
        button = $("<button>").addClass('btn btn-primary btn-block swabs-form users-form').attr({"onClick":'changeActivity("requests")','id':'showRequestsButton'}).text("Richieste").hide();
        div1.append(button);
        button = $("<button>").addClass('btn btn-primary btn-block requests-form').attr({"onClick":'mostraStorico()','id':'mostraStoricoButton'}).text(mostraStorico?"Solo Attuali":"Tutte").hide();
        div1.append(button);
        button = $("<button>").addClass('btn btn-primary btn-block users-form requests-form').attr({"onClick":'changeActivity("swabs")','id':'mostraTamponiButton'}).text("Tamponi").hide();
        div1.append(button);
        if(user.permissions.canUploadSwabs){
            button = $("<button>").addClass('btn btn-primary btn-block swabs-form').attr({"onClick":'uploadSwabs()','id':'caricaTamponiButton'}).text("Carica Tamponi").hide();
            div1.append(button);
        }
        row.append(div1);
        row.append(div2);
        row.append(div3);
        $("#menu").append(row);
    }
}

function mostraStorico(){
    var mostraStorico = JSON.parse(localStorage.getItem("mostraStorico"));
        if (mostraStorico==null) {
            mostraStorico = false;
        } else {
            mostraStorico = !mostraStorico;
        }
    localStorage.setItem("mostraStorico",mostraStorico);
    location.reload();
}
