import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import {LoginResponseData, LoginService} from '../../login.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {StatisticsGeneralModel} from '../../StatisticsGeneral.model';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in-patient.component.html',
  styleUrls: ['./sign-in-patient.component.css']
})
export class SignInPatientComponent implements OnInit {

  loginObs: Observable<LoginResponseData>;
  error: string = null;

  faEnvelope = faEnvelope;
  faLock = faLock;

  statistics: StatisticsGeneralModel;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit(): void {
    this.loginService.getStatistics().subscribe(data => {
      this.statistics = data;
    });
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
