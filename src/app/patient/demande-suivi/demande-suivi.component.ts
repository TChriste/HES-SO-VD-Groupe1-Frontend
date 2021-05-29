import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {PatientService} from '../patient.service';
import {DemandeDeBilanCrationModel} from './demande-de-bilan.model';
import {Disponibilite} from '../patient.model';
import {LoginService} from '../../login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-demande-suivi',
  templateUrl: './demande-suivi.component.html',
  styleUrls: ['./demande-suivi.component.css']
})
export class DemandeSuiviComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() isModalActive = false;
  @Input() idsListesSelectionnees = [];
  @Output() isModalActiveEvent = new EventEmitter<boolean>();

  demandeSuiviObs: Observable<any>;
  disponibilites: Disponibilite[];
  idsDisponibilitesSelectionnees = [];

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private loginService: LoginService,
              private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dispos: this.formBuilder.group({}),
      description: '',
      origine: new FormControl()
    });

    this.patientService.getDisponibilites().subscribe(data => {
      this.disponibilites = data;
      const disposCheckboxes = this.form.get('dispos') as FormGroup;
      this.disponibilites.forEach((option: any) => {
        disposCheckboxes.addControl(option.id, new FormControl(false));
      });
    });
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
    this.isModalActiveEvent.emit(this.isModalActive);
  }

  onSubmit() {
    const values = this.form.value.dispos;
    Object.entries(values).forEach(item => {
      const id = parseInt(item[Object.keys(item)[0]]);
      const checked = item[Object.keys(item)[1]];

      if (checked) {
        this.idsDisponibilitesSelectionnees.push(id);
      }
    });

    const demandeSuivi = new DemandeDeBilanCrationModel(
      this.loginService.user.value.id,
      this.idsListesSelectionnees,
      this.idsDisponibilitesSelectionnees,
      this.form.get('description').value,
      this.form.get('origine').value
    );

    console.log(demandeSuivi);

    this.patientService.postDemandeDeBilan(demandeSuivi).subscribe(resData => {
      this.router.navigate(['/mon-compte']);
    }, errorMessage => {
      console.warn(errorMessage);
    });
  }

}
