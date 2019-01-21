//Zustand dews Scanners
var _scannerIsRunning = false;
var _last_barcode;

//Starten und Handling zur Laufzeit
function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container'),
            constraints: {
                width: 480,
                height: 320,
                facingMode: "environment"
            },
        },
        decoder: {
            readers: [
                "ean_reader"
            ],
            debug: {
                showCanvas: true,
                showPatches: true,
                showFoundPatches: true,
                showSkeleton: true,
                showLabels: true,
                showPatchLabels: true,
                showRemainingPatchLabels: true,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
                }
            }
        },

    }, function (err) {
        if (err) {
            console.log(err);
            return
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        // Set flag to is running
        _scannerIsRunning = true;

        //Ändere den Barcode-Button
        $('#btn').attr('value', 'Scannen beenden');
    });

    Quagga.onDetected(function (result) {
        //Scanner beenden
        collapseScanner();

        //Ergebnisausgabe
        $('#scan_result').show();
        _last_barcode = result.codeResult.code;

        var barcode = "Barcode: " + _last_barcode;
        $('#bm_barcode').text(barcode);

        if (barcode_valide()) {
            $('#bm_valide').text("Barcode in Datenbank: ja");
            $('#bm_info_mit_barcode_button').show();
        } else {
            $('#bm_valide').text("Barcode in Datenbank: nein");
            $('#bm_info_mit_barcode_button').hide();
        };
    });
}

//Prüfen, ob erfasster Barcode bekannt ist
function barcode_valide() {
    var liste = TagMyPlantApp.anlage.getBetriebsmittelAll();

    for (var i = 0; i < liste.length; i++) {
        if (_last_barcode == liste[i].barcode) {
            return true;
        };
    }

    return false;
}
//Beenden und schließen des Scanners
function collapseScanner() {

    Quagga.stop();
    _scannerIsRunning = false;

    $('#scanner-container').children().remove();

    //Ändere den Barcode-Button
    $('#btn').attr('value', 'Barcode Scannen');
}