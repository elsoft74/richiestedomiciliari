function showMenu(user) {
    $("#menu").html("");
    if (user != null) {
        let row = $("<div>").addClass("row");
        let div1 = $("<div>").addClass("col-10");
        let div2 = $("<div>").addClass("col-1");
        let div3 = $("<div>").addClass("col-1");
        let button = $("<button>").addClass("btn").addClass("middle").addClass("btn-primary").addClass("btn-block").attr({ "onClick": "logout()" }).text("Esci");
        let el = $("<span>").addClass("material-symbols-outlined").addClass("middle");
        el.text("logout");
        button.append(el);
        div1.attr("id", "menubuttons");
        div2.attr("id", "user");
        div3.attr("id", "loginbutton");
        div3.append(button);
        div2.text(user.nome + " " + user.cognome);
        button = $("<button>").addClass("btn").addClass("btn-primary").addClass("btn-block").addClass('requests-form-btn').attr({"onClick":'$("#insert").fadeIn()','id':'requestInsertButton'}).text("Nuova Richiesta");
        div1.append(button);
        if(user.permissions.canCreateUser){
            button = $("<button>").addClass("btn").addClass("btn-primary").addClass("btn-block").addClass('users-form-btn').attr({"onClick":'$("#insertUser").fadeIn()','id':'userInsertButton'}).text("Nuovo Utente");
            div1.append(button);
            button = $("<button>").addClass("btn").addClass("btn-primary").addClass("btn-block").addClass('requests-form-btn').attr({"onClick":'showUsers()','id':'showUserButton'}).text("Utenti");
            div1.append(button);
            button = $("<button>").addClass("btn").addClass("btn-primary").addClass("btn-block").addClass('users-form-btn').attr({"onClick":'showRequests()','id':'showRequestsButton'}).text("Richieste");
            div1.append(button);
        }        
        row.append(div1);
        row.append(div2);
        row.append(div3);
        $("#menu").append(row);
    }
}
