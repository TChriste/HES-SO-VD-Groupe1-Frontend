import {EcoleModel} from '../../../ecole/ecole.model';

export class SignUpPatientModel {
  constructor(
    public nom: string,
    public prenom: string,
    public dateNaissance: Date,
    public rue: string,
    public npa: string,
    public localite: string,
    public ecole: EcoleModel,
    public degreScolaire: string,
    public assurance: string,
    public numeroAVS: string,
    public representantLegalNom: string,
    public representantLegalPrenom: string,
    public email: string,
    public password: string,
  ) {}
}
