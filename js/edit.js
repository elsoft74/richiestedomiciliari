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
    $('.user-input-form').val('');
    $("#editUser").fadeOut();
}

function buildAssistitoEditForm(target){
    buildAssistitoInsertForm(target); 
}

function cleanUserEdit() {
    $(".assitito-input-form").val('');
    $("#editAssistito").fadeOut();
}