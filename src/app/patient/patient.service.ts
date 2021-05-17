import {HttpClient} from '@angular/common/http';
import {retry, catchError} from 'rxjs/operators';

import {Patient} from './patient.model';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {BASE_URL} from '../config/config';


@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor(
    private httpClient: HttpClient,
  ) {}

  getPatientById(id): Observable<Patient> {
    return this.httpClient.get<Patient>(BASE_URL + '/test/1')
      .pipe(
        retry(1),
        catchError(this.processError)
      );
  }

  processError(err) {
    let message: string;
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(message);
  }
}
