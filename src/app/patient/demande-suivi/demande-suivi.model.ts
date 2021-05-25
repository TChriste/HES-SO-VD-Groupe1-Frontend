export class DemandeSuiviModel {
  constructor(
    public idPatient: number,
    public idsListesAttente: number[],
    public idsDisponibilites: number[],
    public description: string,
    public origine: string
  ) {}
}
