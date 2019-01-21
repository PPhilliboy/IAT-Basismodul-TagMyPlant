/**
 *  UPDATE METHODE
 *  Aktualisiert der Betriebsmittel-Liste */
var TagMyPlantView = View.extend({
    init: function () {
        this._super();
    },
    /** Sortierung des Tasting-Arrays */
    sortAlg: function (a, b) {
        a = a.typ.toLowerCase();
        b = b.typ.toLowerCase();
        return (a == b) ? 0 : (a > b) ? 1 : -1;
    },
    /** GUI aktualisieren */
    update: function (scope, data) {
        var actTitel = "";
        var count = 0;
        var line = "";

        // (1) Alte Listview löschen
        $('#betriebsmittel_liste ul li').remove();

        var ar = scope.getBetriebsmittelAll(); // (2) alle Betriebsmittel lesen
        ar.sort(this.sortAlg);         // und sortieren

        // (3) Durch die Betirebsmittel gehen
        for (var i = 0; i < ar.length; i++) {
            // Titel
            if (ar[i].typ != actTitel) {
                if (newEntryRowTitle != null) {
                    // Anzahl Betriebsmittel der letzten Anlage setzen
                    newEntryRowTitle.find('.ui-li-count').text(count);
                    count = 0;
                }
                var newEntryRowTitle = $('#titleTemplate').clone();
                actTitel = ar[i].typ;
                newEntryRowTitle.find('#label').text(actTitel);
                newEntryRowTitle.appendTo('#betriebsmittel_liste ul');
            }

            // (4) Allg. Informationen
            count++;
            var newEntryRow = $('#entryTemplate').clone();
            newEntryRow.jqmData('entryId', ar[i].guid);
            newEntryRow.find('#ui-li-title').text(ar[i].bezeichnung);
            newEntryRow.find('.ui-li-thumb').attr("src", ar[i].img_pfad);
            newEntryRow.find('.ui-li-anchor').attr("id", ar[i].guid);

            // (5) Der Liste hinzufügen
            newEntryRow.appendTo('#betriebsmittel_liste ul');
        }

        // Anzahl Wertungen der letzten Distillery setzen
        if (newEntryRowTitle != null) {
            newEntryRowTitle.find('.ui-li-count').text(count);
        }
    }
});

/** Betriebsmittel zur Wahl in BM über Liste */
function set_bm_info_liste(listen_bm) {
    var bm = TagMyPlantApp.anlage.getBetriebsmittelByID(listen_bm.id);

    update_bm_info(bm);
}

/** Betriebsmittel zur Wahl in BM über Barcode */
function set_bm_info_barcode(bm_barcode) {
    var bm = TagMyPlantApp.anlage.getBetriebsmittelByBarcode(bm_barcode);

    update_bm_info(bm);
}

/** Anpassen der BM-Informationsseite zum gewählten BM */
function update_bm_info(bm) {
    //Anpassungen
    $('#bm_content #bm_bezeichnung').text(bm.bezeichnung);
    $('#bm_content img').attr("src", bm.img_pfad);
    $('#bm_content #bm_typ').text((bm.typ + " - " + bm.bezeichnung));
    $('#bm_content #bm_barcode').text(("Barcode: " + bm.barcode));
    $('#pdf_de_anchor').attr("href", bm.pdf_de_pfad);
    $('#pdf_en_anchor').attr("href", bm.pdf_en_pfad);

    //Weiterleitung
    $.mobile.changePage("#bm_info_page");
}