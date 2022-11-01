function buildUserEditForm(target){
    buildUserInsertForm(target); 
}

function cleanUserEdit() {
    $('.user-input-form').val('');
    $("#editUser").modal("hide");
}
