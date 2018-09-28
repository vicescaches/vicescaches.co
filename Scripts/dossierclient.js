
/*** Variable globale contenant le dossier ***/
var monDossier;


/*** OBJET : Dossierclient ***/
var DossierClient = function () {
    /// <summary>Contient toute l'information utile à la création du modal "myCaseModal"</summary>
    /// <field name='FullName' type='String'>Le nom complet de l'utilisateur</field>
    /// <field name='MesSteps' type="Array" elementType="ProgressItem">La liste des éléments "Step()" qui définissent l'avancement de l'utilisateur dans son dossier.</field>
    /// <field name='MesVices' type="Array" elementType="Number">La liste des vices sélectionnés par l'utilisateur. La liste contient les ID seulement.</field>

    this.FullName = "Visiteur anonyme";
    this.MesSteps = new Array();
    this.MesVices = new Array();

    this.in_correspondance = "";
    this.in_documentDate = "";
    this.in_documentCity = "";
    this.in_initialesVendeur = "";
    this.in_nomVendeur = "";
    this.in_adresseVendeur = "";
    this.in_villeVendeur = "";
    this.in_postalVendeur = "";
    this.in_objet = "";
    this.in_scenario = "";
    this.in_alintention = "";
    this.in_residence = "";
    this.in_residenceVille = "";
    this.in_venteDate = "";
    this.in_notaire = "";
    this.in_emmenagementDate = "";
    this.in_problemsDate = "";

    //Signature
    this.in_nomUser     = "";
    this.in_adresseUser = "";
    this.in_villeUser   = "";
    this.in_postalUser  = "";
    this.in_emailUser   = "";
    this.in_phoneUser = "";

    //Specific
    this.in_add_delais = "";
    this.in_addprec_dateenvois = "";
    this.in_addprec_correspondance = "";
    this.in_addprec_delais = "";
    this.in_med_delais = "";
    this.in_med_constat = "";
    this.in_med_raison = "";
    this.in_med_raisonautre = "";
    this.in_med_cost = "";

    //Ajouter les élément de progrès
    this.MesSteps.push(new Step("Step 1"));
    this.MesSteps.push(new Step("Step 2"));
    this.MesSteps.push(new Step("Step 3"));
    this.MesSteps.push(new Step("Step 4"));
    this.MesSteps.push(new Step("Step 5"));


    this.AddVice = function (id, text) {
        /// <summary>Ajouter un vice au dossier</summary>
        /// <param name="viceId" type="string">Le ID du vice caché</param>
        this.MesVices.push({
            KnowledgeID: id,
            MenuDisplay: text
        })
    }

    this.RemoveVice = function (viceId) {
        /// <summary>Enlever un vice au dossier</summary>
        /// <param name="viceId" type="string">Le ID du vice caché</param>

        //Reconstruire la liste des vices en ignorant le viceId fourni en paramètre.
        var newList = new Array();
        for (var i = 0; i < this.MesVices.length; i++) {
            if (this.MesVices[i].KnowledgeID != viceId) {
                newList.push(this.MesVices[i]);
            }
        }
        this.MesVices = newList;
    }

    this.PrintInConsole = function () {
        /// <summary>Afficher cet objet dans la console</summary>
        if (console && console.log) {
            console.log(this);
        }
    }

    this.SaveInLocal = function () {
        /// <summary>Sauvegarder Mon Dossier dans le 'LocalStorage' du browser</summary>
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("DossierClient", JSON.stringify(this));
        }
    }

    this.LoadFromLocal = function () {
        /// <summary>Charger Mon Dossier à partir du 'LocalStorage' du browser</summary>
        /// <returns type="bool">Return "false" si l'objet n'existe pas.</returns>

        if (typeof (Storage) !== "undefined") {

            var item = localStorage.getItem("DossierClient");

            if (item != null) {
                var tempObj = JSON.parse(item);
                this.FullName = tempObj.FullName;
                this.MesSteps = tempObj.MesSteps;
                this.MesVices = tempObj.MesVices;

                //For all property of this object
                for (var property in this) {
                    //If property starts with "in_" (form inputs)
                    if (this.hasOwnProperty(property) && property.substring(0, 3) == "in_") {
                        //Load property value
                        this[property] = tempObj[property];
                    }
                }

                return true;
            }
            else {
                return false;
            }
            
        }
    }

    this.RemoveFromLocal = function () {
        /// <summary>Supprimer Mon Dossier du 'LocalStorage' du browser</summary>
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem("DossierClient");
        }
    }
}


/*** OBJET : Step ***/
var Step = function (stepName) {
    /// <summary>Contient toute l'information utile à la gestion d'une étape "step"</summary>
    /// <field name='StepName' type='String'>Nom de l'étape</field>
    /// <field name='StepIsDone' type='String'>True si l'étape à été complété par l'uitilisateur</field>
    /// <field name='StepURL' type='String'>URL de la page à accéder pour accomplir l'étape</field>
    /// <field name='StepDescription' type='String'>Description de l'étape</field>

    this.StepName = stepName;
    this.StepIsDone = false;
    this.StepURL = "/";
    this.StepDescription = "Ceci est une nouvelle étape.";
}


/*** PAGE LOAD ***/
$(function () {

    //Check if MonDossier exist
    monDossier = new DossierClient();
    var exist = monDossier.LoadFromLocal();

    if (exist) {
        // Do exist
    } else {
        // Do not exist
    }

})