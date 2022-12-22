<?php
include_once("common.php");
?>
<html>

<?php
buildHead("Gestionale UCA - Utenti");
?>

<body>
    <nav id="menu"></nav>
    <div><p class="pageTile">Utenti</p></div>
    <div id="insertUser"></div>
    <div id="login" class="sections"></div>
    <div id="users" class="sections users-form"></div>
    <div id="editUser"></div>
    <!-- <div id="firma"><a href="https://ivopugliese.it">©2022 Ivo Pugliese</a></div> -->
    <script>       
        if ($("#login").html() == "") {
            buildLogin();
        }
        window.addEventListener('dataLoaded', function() {
            buildUserInsertForm("insertUser");
            buildUserEditForm("editUser");
            showMenu(lu);
            showUsers();
        });
        window.onload = function() {
            lu = JSON.parse(sessionStorage.getItem("ricdomloggeduser"));
            if (lu == null) {
                if (!$("#login").is(":visible")) {
                    showLogin();
                }
            } else {
                hideLogin();
                loadData();
            }

        };
        // window.addEventListener('beforeunload', function (e) {
        //     sessionStorage.removeItem("lastRead");
        //     e.preventDefault();
        //     e.returnValue = '';
        // });
    </script>
</body>

</html>
