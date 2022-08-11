function buildEditForm(target){
    buildInsertForm(target); 
}


function cleanEdit() {
    $("#editId").val('')
    $("#editNome").val("");
    $("#editCognome").val("");
    $("#editCodiceFiscale").val("");
    $("#editEmail").val("");
    $("#editNumero").val("");
    $("#editData").val("");
    $("#editDataUltimaComunicazione").val("");
    $("#editFase").val("");
    $("#editMotivo").val("");
    $("#editNote").val("");
    $("#edit").fadeOut();
}

function buildUserEditForm(target){
    buildUserInsertForm(target); 
}

function cleanUserEdit() {
    $("#idUser").val('');
    $("#nomeUser").val('');
    $("#cognomeUser").val('');
    $("#usernameUser").val('');
    $("#emailUser").val('');
    $("#roleIdUser").val('');
    $("#isActivedUser").val('');
    $("#editUser").fadeOut();
}