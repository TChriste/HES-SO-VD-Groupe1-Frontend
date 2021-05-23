import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {PatientService} from '../patient.service';
import {Router} from '@angular/router';
import {DemandeSuiviModel} from './demande-suivi.model';

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

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dispos: this.formBuilder.group({}),
      description: '',
      origine: new FormControl()
    });
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
    this.isModalActiveEvent.emit(this.isModalActive);
  }

  onSubmit() {
    const demandeSuivi = new DemandeSuiviModel(
      this.idsListesSelectionnees,
      [],
      this.form.get('description').value,
      this.form.get('origine').value
    );
    this.patientService.postDemandeSuivi(demandeSuivi).subscribe(resData => {
      console.log('Done');
    }, errorMessage => {
      console.warn(errorMessage);
    });
    console.log(this.form);
  }

}
