<?php
    include_once("common.php");
?>
<html>

<?php
    buildHead("Gestionale UCA - Pazienti Positivi");
?>

<body>
    <nav id="menu"></nav>
    <div><p class="pageTile">Pazienti Positivi</p></div>
    <div class="lds-grid position-absolute top-50 start-50 translate-middle"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <div id="swabs" class="sections swabs-form">
        <table id="mainSwabs" class="table table-striped" style="width:100%"></table>
    </div>
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
        window.addEventListener('sessionExpired', sessionExpired); 
        window.onload = function() {    
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
