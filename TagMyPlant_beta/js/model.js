/** 
 *  Objekt Betriebsmittel repräsentiert ein Betriebsmittel
 */
var Betriebsmittel = Class.extend({
    // Konstruktor
    init: function (bezeichnung, typ, barcode, img_pfad, pdf_de_pfad, pdf_en_pfad) {

        // GUID als ID (somit keine Probleme bei Verteilten Einträgen)
        this.guid = this.generateGUID();

        // Parameter eines Betriebsmittels
        this.bezeichnung = bezeichnung;
        this.typ = typ;
        this.barcode = barcode;
        this.img_pfad = img_pfad;
        this.pdf_de_pfad = pdf_de_pfad;
        this.pdf_en_pfad = pdf_en_pfad;
    },

    /**
     * Gibt eine Bezeichnung des Betriebsmittels zurück.
     */
    getName: function () {
        return "Bezeichnung: " + this.bezeichnung + "; Typ: " + this.typ + "; Barcode: " + this.barcode +
            "; Img-Pfad: " + this.img_pfad + "; PDF-DE-Pfad: " + this.pdf_de_pfad +
            "; PDF-DE-Pfad: " + this.pdf_en_pfad;
    }
});

/** Objekt Anlage - Container für Betriebsmittel
 *  mit den üblichen CRUD-Funktionen.
 */
var Anlage = Observer.extend({
    init: function () {
        this._super();
        this.BM_Ar = new Array();
    },

    // Nun die CRUD Funktionen
    /** Anlage setzen */
    setAnlage: function (array) {
        this.BM_Ar = array;

        // update
        this.notify({ obj: this.BM_Ar, crud: "R" });
    },

    /** (C) Erzeugt ein Betriebsmittel und füge dies hinzu.
     */
    create: function (bezeichnung, typ, barcode, img_pfad, pdf_de_pfad, pdf_en_pfad) {

        // Betriebsmittel erzeugen
        var betriebsmittel = new Betriebsmittel(bezeichnung, typ, barcode, img_pfad, pdf_de_pfad, pdf_en_pfad);

        // dem Array hinzufügen      
        this.BM_Ar.push(betriebsmittel);

        // update
        this.notify({ obj: betriebsmittel, crud: "C" });
    },

    /** (C) Fügt einen Eintrag hinzu, mit Betriebsmittel-Objekt
     */
    add: function (betriebsmittel) {
        // dem Array hinzufügen      
        this.BM_Ar.push(betriebsmittel);

        // update
        this.notify({ obj: betriebsmittel, crud: "C" });
    },

    /** (R) Sucht das Betriebsmittel mit der GUID.
     */
    getBetriebsmittelByID: function (guid) {
        for (var i = 0; i < this.BM_Ar.length; i++) {
            if (this.BM_Ar[i].guid == guid) {
                return this.BM_Ar[i];
            }
        }
    },

    /** (R) Sucht das Betriebsmittel mit dem Barcode.
    */
    getBetriebsmittelByBarcode: function (barcode) {
        for (var i = 0; i < this.BM_Ar.length; i++) {
            if (this.BM_Ar[i].barcode == barcode) {
                return this.BM_Ar[i];
            }
        }
    },

    /** (R) Array mit Betriebsmitteln zurückgeben
     */
    getBetriebsmittelAll: function () {
        return this.BM_Ar;
    },

    /** (U) Aktualisiert das Betriebsmittel.
     * Wenn dies nicht vorhanden ist, wird ein neues erzeugt.
     */
    edit: function (betriebsmittel) {
        var gefunden = 0;

        for (var i = 0; i < this.BM_Ar.length; i++) {
            if (this.BM_Ar[i].guid == betriebsmittel.guid) {
                // Betriebsmittel gefunden, nun ersetzen
                this.BM_Ar[i] = betriebsmittel;
                gefunden = 1;
                this.notify({ obj: betriebsmittel, crud: "U" });
            }
        }

        // existiert keins, dann hinzufügen
        if (gefunden == 0)
            this.add(betriebsmittel);
    },

    /** (D) Löscht das Betriebsmittel mit der GUID.
     */
    deleteID: function (guid) {
        for (var i = 0; i < this.BM_Ar.length; i++) {
            if (this.BM_Ar[i].guid == guid) {
                var deleted = this.BM_Ar.splice(i, 1);
                this.notify({ obj: deleted[0], crud: "D" });
                return;
            }
        }
    }
});
