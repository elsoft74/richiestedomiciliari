<?php
include_once("common.php");
?>
<html>

<?php
buildHead();
?>

<body>
    <nav id="menu"></nav>
    <div class="lds-grid position-absolute top-50 start-50 translate-middle"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <div id="insert"></div>
    <div id="insertAssistito"></div>
    <div id="login" class="sections"></div>
    <div id="editAssistito"></div>
    <div id="assistiti"></div>
    <div id="firma"><a href="https://ivopugliese.it">©2022 Ivo Pugliese</a></div>
    <script>       
        if ($("#login").html() == "") {
            buildLogin();
        }
        window.addEventListener('dataLoaded', function() {
            buildInsertForm("insert");
            buildAssistitoInsertForm("insertAssistito");
            buildAssistitoEditForm("editAssistito");
            showMenu(lu);
            $(".lds-grid").hide();
            changeActivity("assistiti");
        });
        window.addEventListener('dataUpdated', updateTableDataAssistiti); 
        window.onload = function() {
            spostaFirma();
            $(".lds-grid").hide();
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