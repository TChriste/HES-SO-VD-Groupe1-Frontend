import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import {LoginResponseData, LoginService} from '../login.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-patient.component.html',
  styleUrls: ['./login-patient.component.css']
})
export class LoginPatientComponent implements OnInit {

  loginObs: Observable<LoginResponseData>;
  error: string = null;

  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.loginObs = this.loginService.loginPatient(email, password);

    this.loginObs.subscribe(resData => {
        this.router.navigate(['/']);
    }, errorMessage => {
      this.error = errorMessage;
    });

    form.reset();
  }

}
