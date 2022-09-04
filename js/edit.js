function buildEditForm(target){
    buildInsertForm(target); 
}


function cleanEdit() {
    $(".richiesta-input-form").val('')
    $("#edit").hide();
}

function buildUserEditForm(target){
    buildUserInsertForm(target); 
}

function cleanUserEdit() {
    $('.user-input-form').val('');
    $("#editUser").hide();
}