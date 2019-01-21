var TagMyPlantApp = {
    anlage: new Anlage(),
    controller: new TagMyPlantController(),
    gui: new TagMyPlantView()
}

//Observer auf Anlage
TagMyPlantApp.anlage.addObserver(TagMyPlantApp.gui, "update");

//Kleinversuchsanlage des IfA einbinden
TagMyPlantApp.anlage.setAnlage(ifa_anlage);