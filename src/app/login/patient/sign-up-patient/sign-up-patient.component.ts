import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as bulmaCalendar from 'bulma-calendar';
import {SignUpPatientModel} from './sign-up-patient.model';
import {LoginResponseData, LoginService} from '../../login.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {EcoleModel} from '../../../ecole/ecole.model';
import {EcoleService} from '../../../ecole/ecole.service';

@Component({
  selector: 'app-sign-up-patient',
  templateUrl: './sign-up-patient.component.html',
  styleUrls: ['./sign-up-patient.component.css']
})
export class SignUpPatientComponent implements OnInit {

  loginObs: Observable<LoginResponseData>;
  error: string;
  dateNaissanceSelected: Date;
  ecoles: EcoleModel[];
  ecoleSelected: EcoleModel = null;

  constructor(private loginService: LoginService,
              private ecoleService: EcoleService,
              private router: Router) { }

  ngOnInit(): void {
    // Initialize all input of type date
    const bulmaCalendars = bulmaCalendar.attach('[type="date"]');
    for (const calendar of bulmaCalendars) {
      calendar.on('select', date => {
        this.dateNaissanceSelected = new Date(date.timeStamp);
      });
    }

    this.ecoleService.getEcoles().subscribe( resData => {
      this.ecoles = resData;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const patientInfos: SignUpPatientModel = new SignUpPatientModel(
      form.value.nom,
      form.value.prenom,
      this.dateNaissanceSelected,
      form.value.rue,
      form.value.npa,
      form.value.localite,
      form.value.ecole,
      form.value.degreScolaire,
      form.value.assurance,
      form.value.numeroAVS,
      form.value.representantLegalNom,
      form.value.representantLegalPrenom,
      form.value.email,
      form.value.password,
    );

    this.loginObs = this.loginService.signUpPatient(patientInfos);

    this.loginObs.subscribe(resData => {
      this.router.navigate(['/connexion']);
    }, errorMessage => {
      this.error = errorMessage;
    });
  }

}
