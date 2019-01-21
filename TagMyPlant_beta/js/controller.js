/** Controller */
var TagMyPlantController = function () {
    var actBetriebsmittel;
    var actBarcode;

    /** Verlinkung zur Seite: Titelbild
    * Quelle: Fixierter Header (Home-Icon)
    * Ziel: Titelbild */
    function home() {
        //Scanner ausschalten
        if (_scannerIsRunning) {
            collapseScanner();
        }
        //Barcode entfernen
        $('#bm_barcode').text("Barcode:");

        $.mobile.changePage("#home_page");
    }

    /** Dialogfenster zur Seite: Projekt-Informationen
    * Quelle: Fixierter Header (Info-Icon)
    * Ziel: BM-Auswahl über Liste */
    function projektinfo() {
        $.mobile.changePage("#projektinfo_page", { transition: "fade", role: "dialog", });
    }

    /** Verlinkung zur Seite: BM-Auswahl über Barcode
     * Quelle: Titelseite & BM-Informationen
     * Ziel: BM-Auswahl über Barcode */
    function barcodeseite() {
        //Barcodeergebnisse ausblenden
        $('#scan_result').hide();
        $.mobile.changePage("#bm_barcode_page");
    }

    /** Verlinkung zur Seite: BM-Auswahl über Liste
    * Quelle: Titelseite & BM-Informationen
    * Ziel: BM-Auswahl über Liste */
    function listenseite() {
        $.mobile.changePage("#bm_liste_page");

        //Betriebsmittel in der Anlage setzen
        var anlage = TagMyPlantApp.anlage.getBetriebsmittelAll();
        TagMyPlantApp.anlage.setAnlage(anlage);
    }

    /** Verlinkung zur Seite: BM-Informationen
    * Quelle: BM-Auswahl über Barcode
    * Ziel: BM-Informationen */
    function detailsseite() {
        set_bm_info_barcode(_last_barcode);
        $.mobile.changePage("#bm_info_page");
    }

    /** Handlung BarcodeScan: Start/Stop */
    function barcode_on_off() {
        if (_scannerIsRunning) {
            collapseScanner();
        } else {
            startScanner();

            //Barcode-Ausgabe anpassen
            $('#scan_result').hide();
            $('#bm_barcode').text("Barcode:");
        };
    }

    /** PDF(DE)-Viewer ausführen */
    function pdf_de_view() {
        $.mobile.changePage("#pdf_page", { transition: "fade", role: "dialog", });
        $('#pdf_de_anchor').gdocsViewer({ width: 200, height: 200 });
    }

    /** PDF(EN)-Viewer ausführen */
    function pdf_en_view() {
        $.mobile.changePage("#pdf_page", { transition: "fade", role: "dialog", });
        $('#pdf_en_anchor').gdocsViewer({ width: $(window).width(), height: 620 });
    }

    return {
        initialize: function () {
            // Button: Home von BM-Auswahl über Barcode
            $("#bm_barcode_home").click(home);
            // Button: Home von BM-Auswahl über Liste
            $("#bm_liste_home").click(home);
            // Button: Home von BM-Ansicht
            $("#bm_home").click(home);

            // Button: Info von Home
            $("#home_info").click(projektinfo);
            // Button: Info von BM-Auswahl über Barcode
            $("#bm_barcode_info").click(projektinfo);
            // Button: Info von BM-Auswahl über Liste
            $("#bm_liste_info").click(projektinfo);
            // Button: Info von BM-Ansicht
            $("#bm_info").click(projektinfo);

            // Button: BM über Barcode von Home
            $("#bm_ueber_barcode").click(barcodeseite);
            // Button: BM über Barcode von BM-Auswahl
            $("#zurueck_zu_bm_barcode").click(barcodeseite);

            // Button: BM über Liste von Home
            $("#bm_ueber_liste").click(listenseite);
            // Button: BM über Liste von BM-Auswahl
            $("#zurueck_zu_bm_liste").click(listenseite);

            // Button: BM-Informationen über BM-Auswahl über Barcode 
            $("#bm_info_mit_barcode").click(detailsseite);

            // Button: Barcode-Scan ON/OFF
            $("#btn").click(barcode_on_off);

            // Button: PDF-Deutsch ansehen
            $("#pdf_deu").click(pdf_de_view);
            // Button: PDF-Deutsch ansehen
            $("#pdf_eng").click(pdf_en_view);
        }
    };
}

/** Controller aufrufen, wenn pageinit von jQM geworfen wird. */
$('#home_page').live("pageinit", function (event) {
    // Event-Listener Buttons
    TagMyPlantApp.controller.initialize();
});

/** PDF-Viewer Schließen */
$('#pdf_page').live('pagehide', function (event) {
    var pdf_de_link = $('#pdf_de_anchor').attr("href");
    var pdf_en_link = $('#pdf_en_anchor').attr("href");

    $('#pdf_div').children().remove();
    $('#pdf_div').prepend("<a href='" + pdf_de_link + "' id='pdf_de_anchor'></a>" +
                          "<a href='" + pdf_en_link + "' id='pdf_en_anchor'></a>");
});