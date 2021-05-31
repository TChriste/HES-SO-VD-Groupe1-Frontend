
export class ListeAttenteVueLogoModel {
  public id: number;
  public demandesDeBilans: DemandeDeBilanVueLogoModel[];

  constructor(id: number, demandesDeBilans: DemandeDeBilanVueLogoModel[]) {
    this.id = id;
    this.demandesDeBilans = demandesDeBilans;
  }
}

export class DemandeDeBilanVueLogoModel {
  public id: number;
  public date: Date;
  public statut: string;
  public description: string;
  public patient: InfoPatientVueLogoModel;
  public disponibilites: Disponibilite[];
  public origine: string;

  constructor(id: number, date: Date, statut: string, description: string, patient: InfoPatientVueLogoModel, disponibilites: Disponibilite[], origine: string) {
    this.id = id;
    this.date = date;
    this.statut = statut;
    this.description = description;
    this.patient = patient;
    this.disponibilites = disponibilites;
    this.origine = origine;
  }
}

export class InfoPatientVueLogoModel {
  public id: number;
  public nom: string;
  public prenom: string;
  public dateNaissance: Date;
  public rue: string;
  public npa: string;
  public localite: string;
  public ecole: string;
  public degreScolaire: string;
  public assurance: string;
  public numAVS: string;
  public representantLegalNom: string;
  public representantLegalPrenom: string;


  constructor(id: number, nom: string, prenom: string, dateNaissance: Date, rue: string, npa: string, localite: string, ecole: string, degreScolaire: string, assurance: string, numAVS: string, representantLegalNom: string, representantLegalPrenom: string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.dateNaissance = dateNaissance;
    this.rue = rue;
    this.npa = npa;
    this.localite = localite;
    this.ecole = ecole;
    this.degreScolaire = degreScolaire;
    this.assurance = assurance;
    this.numAVS = numAVS;
    this.representantLegalNom = representantLegalNom;
    this.representantLegalPrenom = representantLegalPrenom;
  }
}

export class Disponibilite {
  public id: number;
  public libelle: string;

  constructor(id: number, libelle: string) {
    this.id = id;
    this.libelle = libelle;
  }
}

export class StatisticsModel {
  public nbPatientsEnListeAttente: number;
  public nbPatientsAcceptes: number;
  public nbPatientsRefuses: number;
  public dureeAttenteEstimee: number;
}
