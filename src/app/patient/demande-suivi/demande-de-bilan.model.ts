import {Disponibilite, ListeAttente} from '../patient.model';

export class DemandeDeBilanCrationModel {
  constructor(
    public idPatient: number,
    public idsListesAttente: number[],
    public idsDisponibilites: number[],
    public description: string,
    public origine: string
  ) {}
}

export class DemandeDeBilanModel {
  constructor(
    public id: number,
    public date: Date,
    public statut: string,
    public description: string,
    public listesAttente: ListeAttente,
    public disponibilites: Disponibilite
  ) {}
}
