export class Patient {
  public id: number;
  public nom: string;
  public prenom: string;

  constructor(id: number, nom: string, prenom: string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
  }
}

export class ListeAttente {
  public id: number;
  public logopediste: Logopediste;

  constructor(id: number, logopediste: Logopediste) {
    this.id = id;
    this.logopediste = logopediste;
  }
}

export class Logopediste {
  public id: number;
  public nom: string;
  public prenom: string;
  public rue: string;
  public npa: string;
  public localite: string;
  public specialisations: Specialisation[];

  constructor(id: number, nom: string, prenom: string, rue: string, npa: string, localite: string, specialisations: Specialisation[]) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.rue = rue;
    this.npa = npa;
    this.localite = localite;
    this.specialisations = specialisations;
  }
}

export class Specialisation {
  public id: number;
  public libelle: string;

  constructor(id: number, libelle: string) {
    this.id = id;
    this.libelle = libelle;
  }
}

