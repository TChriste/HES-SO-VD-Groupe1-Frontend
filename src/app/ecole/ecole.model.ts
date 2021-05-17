import {DegresScolaireModel} from './degres-scolaire.model';

export class EcoleModel {
  public id: number;
  public nom: string;
  public degresScolaire: DegresScolaireModel[];

  constructor(id: number, nom: string, degresScolaire: DegresScolaireModel[]) {
    this.id = id;
    this.nom = nom;
    this.degresScolaire = degresScolaire;
  }
}
