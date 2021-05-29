import { Component, OnInit } from '@angular/core';
import {LogopedisteService} from '../logopediste.service';
import {DemandeDeBilanVueLogoModel} from '../logopediste.model';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-liste-attente',
  templateUrl: './liste-attente.component.html',
  styleUrls: ['./liste-attente.component.css']
})
export class ListeAttenteComponent implements OnInit {

  isLoading = false;
  idListeAttente: number;
  demandes: DemandeDeBilanVueLogoModel[];

  confirmation: string;
  error: string;

  constructor(
    private logopedisteService: LogopedisteService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.logopedisteService.getListeAttente(this.loginService.user.value.id).subscribe(data => {
      this.demandes = data.demandesDeBilans;
      this.idListeAttente = data.id;
      this.isLoading = false;
    });
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

  removeDemandeDeBilan(idDemandeDeBilan: number) {
    this.logopedisteService.removeDemandeDeBilan(this.idListeAttente, idDemandeDeBilan).subscribe(() => {
      this.confirmation = 'La demande a bien été supprimée de votre liste d\'attente';
      this.demandes = this.demandes.filter(demande => {
        return demande.id !== idDemandeDeBilan;
      });
      }, errorMessage => {
      this.error = errorMessage;
    });
  }
}
