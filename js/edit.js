function buildEditForm(target){
    buildInsertForm(target); 
}


function cleanEdit() {
    $(".richiesta-input-form").val('')
    $("#edit").fadeOut();
}

function buildUserEditForm(target){
    buildUserInsertForm(target); 
}

function cleanUserEdit() {
    $('.user-input-form').val('');
    $("#editUser").fadeOut();
}