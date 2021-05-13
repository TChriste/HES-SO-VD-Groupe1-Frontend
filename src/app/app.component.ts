import {Component, OnInit} from '@angular/core';
import {PatientService} from './patient/patient.service';
import {Patient} from './patient/patient.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  patient: Patient;

  constructor(
    public patientService: PatientService
  ) { }

  ngOnInit() {
    // this.getPatientById();
  }

  getPatientById() {
    return this.patientService.getPatientById(1).subscribe((res: Patient) => {
      this.patient = res;
    });
  }
}
