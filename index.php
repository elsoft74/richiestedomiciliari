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
    <div id="main" class="sections requests-form"></div>
    <div id="mainSwabs" class="sections swabs-form"></div>
    <div id="insert"></div>
    <div id="insertUser"></div>
    <div id="login" class="sections"></div>
    <div id="tamponeEdit"></div>
    <div id="tamponeUpload"></div>
    <div id="changeUsca"></div>
    
    <script>       
        if ($("#login").html() == "") {
            buildLogin();  
        }
        window.addEventListener('dataLoaded', function() {
            buildInsertForm();
            showMenu(lu);
            $(".lds-grid").hide();
            changeActivity("swabs");
        });
        window.addEventListener('dataUpdated', updateTableDataTamponi); 
        window.onload = function() {    
            // spostaFirma();
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