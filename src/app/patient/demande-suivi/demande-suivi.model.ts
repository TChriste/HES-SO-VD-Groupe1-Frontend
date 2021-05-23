export class DemandeSuiviModel {
  constructor(
    public idsListesAttente: number[],
    public disponibilites: string[],
    public description: string,
    public origine: string
  ) {}
}
