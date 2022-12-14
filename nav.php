<html>

<head>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3">
    <script src="bootstrap/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"></script>
    <script type="text/javascript" src="js/xlsx.full.min.js"></script>
    <!-- <script type="text/javascript" src="https://oss.sheetjs.com/sheetjs/xlsx.full.min.js"></script> -->
    <!-- <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> -->
    <link rel="stylesheet" href="font/index.css"/>
    <link href="css/tabulator.min.css" rel="stylesheet">
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
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#">Utenti</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Elenco Pazienti</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Elenco Attivit??</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Carica Tamponi</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Scarica Tamponi</a>
        </li>
        
      </ul>
    </div>
    <div class="container-fluid d-flex top-0 end-0">
    <span class="navbar-text">
      Ivo Pugliese
    </span>
  </div>
  </div>
</nav>
    <div id="firma"><a href="https://ivopugliese.it">??2022 Ivo Pugliese</a></div>
    <script>       
        if ($("#login").html() == "") {
            buildLogin();
        }
        // window.addEventListener('dataLoaded', function() {
            // buildInsertForm("insert");
            // buildEditForm("edit");
            // buildUserInsertForm("insertUser");
            // buildUserEditForm("editUser");
            // buildAssistitoInsertForm("insertAssistito");
            // buildAssistitoEditForm("editAssistito");
            showMenu(lu);
            // showRequests(richieste, lu);
            // showSwabs(swabs,lu);
            // showAssistiti(assistiti,lu);
            // changeActivity("swabs");
        // });
        // window.addEventListener('dataUpdated', updateTableDataTamponi); 
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