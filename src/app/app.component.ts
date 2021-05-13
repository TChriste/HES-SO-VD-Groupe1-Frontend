import {Component, OnInit} from '@angular/core';
import {PatientService} from './patient/patient.service';
import {Patient} from './patient/patient.model';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.autoLogin();
  }
}
