import {HttpClient} from '@angular/common/http';
import {retry, catchError} from 'rxjs/operators';

import {Disponibilite, ListeAttente} from './patient.model';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {BASE_URL} from '../config/config';
import {DemandeSuiviModel} from './demande-suivi/demande-suivi.model';


@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor(
    private httpClient: HttpClient,
  ) {}


  getListesAttente(): Observable<ListeAttente[]> {
    return this.httpClient.get<ListeAttente[]>(BASE_URL + '/liste-attente').pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  getDisponibilites(): Observable<Disponibilite[]> {
    return this.httpClient.get<Disponibilite[]>(BASE_URL + '/disponibilites').pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  postDemandeSuivi(demandeSuivi: DemandeSuiviModel): Observable<any> {
    return this.httpClient.post<any>(BASE_URL + '/patient/demande-suivi', demandeSuivi)
                          .pipe(catchError(this.processError));
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
