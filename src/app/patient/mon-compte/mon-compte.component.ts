import { Component, OnInit } from '@angular/core';
import {PatientService} from '../patient.service';
import {DemandeDeBilanModel} from '../demande-suivi/demande-de-bilan.model';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})

export class MonCompteComponent implements OnInit {

  ongletDemandeDeBilan = 'DEMANDES_DE_BILAN';
  ongletDonneesPersonnelles = 'DONNEES_PERSONNELLES';
  ongletActif: string;

  demandes: DemandeDeBilanModel[];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.ongletActif = this.ongletDonneesPersonnelles;
    this.patientService.getDemandesDeBilan(37).subscribe(res => this.demandes = res);
  }

  setOngletDonneesPersonnelles() {
    this.ongletActif = this.ongletDonneesPersonnelles;
  }

  setOngletDemandesDeBilan() {
    this.ongletActif = this.ongletDemandeDeBilan;
  }

  getStatut(statut: string) {
    switch (statut) {
      case 'EN_ATTENTE':
        return 'En attente';
      case 'ACCEPTEE':
        return 'Acceptée';
      case 'REFUSEE':
        return 'Refusée';
      default:
        return '';
    }
  }
}
