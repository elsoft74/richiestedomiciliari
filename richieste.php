<html>

<head>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3">
    <script src="bootstrap/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"></script>
    <script type="text/javascript" src="js/xlsx.full.min.js"></script>
    <!-- <script type="text/javascript" src="https://oss.sheetjs.com/sheetjs/xlsx.full.min.js"></script> -->
    <!-- <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> -->
    <link rel="stylesheet" href="font/index.css"/>
    <!-- <link href="css/tabulator.min.css" rel="stylesheet"> -->
    <link href="css/tabulator_modern.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/sweetalert2.min.css">
    <script type="text/javascript" src="js/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="js/luxon.min.js"></script>
    <script type="text/javascript" src="js/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="js/tabulator.min.js"></script>
    <!-- <script type="text/javascript" src="js/jquery_wrapper.js"></script> -->
    <script type="text/javascript" src="js/utils.js"></script>
    <script type="text/javascript" src="js/requests.js"></script>
    <script type="text/javascript" src="js/menu.js"></script>
    <script type="text/javascript" src="js/priorita.js"></script>
    <script type="text/javascript" src="js/tipologia.js"></script>
    <script type="text/javascript" src="js/ruolo.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
    <script type="text/javascript" src="js/insert.js"></script>
    <script type="text/javascript" src="js/edit.js"></script>
    <script type="text/javascript" src="js/users.js"></script>
    <script type="text/javascript" src="js/assistito.js"></script>
    <script type="text/javascript" src="js/usca.js"></script>
    <script type="text/javascript" src="js/swabs.js"></script>
    <script type="text/javascript" src="js/sweetalert2.all.min.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.29/dist/sweetalert2.all.min.js"></script> -->

</head>

<body>
    <nav id="menu"></nav>
    <div class="lds-grid position-absolute top-50 start-50 translate-middle"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <div id="main" class="sections requests-form"></div>
    <div id="insert"></div>
    <div id="login" class="sections"></div>
    <div id="edit"></div>
    <div id="modalNoteRichiesta"></div>
    <div id="firma"><a href="https://ivopugliese.it">©2022 Ivo Pugliese</a></div>
    <script>       
        if ($("#login").html() == "") {
            buildLogin();
        }
        window.addEventListener('dataLoaded', function() {
            buildInsertForm("insert");
            buildEditForm("edit");
            showMenu(lu);
            $(".lds-grid").hide();
            changeActivity("requests");
        });
        window.addEventListener('dataUpdated', updateRequestData); 
        window.onload = function() {
            $(".lds-grid").hide();
            lu = JSON.parse(localStorage.getItem("ricdomloggeduser"));
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
        //     localStorage.removeItem("lastRead");
        //     e.preventDefault();
        //     e.returnValue = '';
        // });
    </script>
</body>

</html>