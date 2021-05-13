import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {User} from './user.model';
import {BASE_URL} from '../config/config';
import {SignUpPatientModel} from './patient/sign-up-patient/sign-up-patient.model';

export interface LoginResponseData {
  id: number;
  email: string;
  nom: string;
  prenom: string;
}

@Injectable({providedIn: 'root'})
export class LoginService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  loginPatient(email: string, password: string) {
    return this.http
      .post<LoginResponseData>(
        BASE_URL + '/patient/sign-in',
        { email, password }
      ).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.id, resData.email, resData.nom, resData.prenom, 'PATIENT', 'NON_GERE', 3600);
      }));
  }

  signUpPatient(patientInfos: SignUpPatientModel) {
    return this.http
      .post<LoginResponseData>(
        BASE_URL + '/patient/sign-up',
        { patientInfos }
      ).pipe(catchError(this.handleError));
  }

  autoLogin() {
    const userData: {
      id: number;
      email: string;
      nom: string;
      prenom: string;
      role: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 15);
    const loadedUser = new User(userData.id, userData.email, userData.nom, userData.prenom, userData.role,
                                userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = expirationDate.getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/connexion']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(id: number, email: string, nom: string, prenom: string, role: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(id, email, nom, prenom, role, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (!errorRes.status) {
      return throwError(errorMessage);
    }
    switch (errorRes.status) {
      case 401:
        errorMessage = 'Email ou mot de passe incorrect !';
        break;
      default:
        errorMessage = 'Une erreur est survenue !';
        break;
    }
    return throwError(errorMessage);
  }
}
