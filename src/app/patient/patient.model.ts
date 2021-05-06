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
