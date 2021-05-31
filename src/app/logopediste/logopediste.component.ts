import { Component, OnInit } from '@angular/core';
import {LogopedisteService} from './logopediste.service';
import {LoginService} from '../login/login.service';
import {StatisticsModel} from './logopediste.model';

@Component({
  selector: 'app-logopediste',
  templateUrl: './logopediste.component.html',
  styleUrls: ['./logopediste.component.css']
})



export class LogopedisteComponent implements OnInit {

  statistics: StatisticsModel;
  DUREE_MOYEN_EN_JOURS_POUR_PRENDRE_NOUVELLE_DEMANDE = 20;


  constructor(private logopedisteService: LogopedisteService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.logopedisteService.getStatistics(this.loginService.user.value.id).subscribe(data => {
      this.statistics = data;
    });
  }

  refuserDemandeEvent($event: any) {
    this.statistics.nbPatientsRefuses++;
    this.statistics.nbPatientsEnListeAttente--;
    this.statistics.dureeAttenteEstimee -= this.DUREE_MOYEN_EN_JOURS_POUR_PRENDRE_NOUVELLE_DEMANDE;
  }

  accepterDemandeEvent($event: any) {
    this.statistics.nbPatientsAcceptes++;
    this.statistics.nbPatientsEnListeAttente--;
    this.statistics.dureeAttenteEstimee -= this.DUREE_MOYEN_EN_JOURS_POUR_PRENDRE_NOUVELLE_DEMANDE;
  }
}
