import {HttpClient} from '@angular/common/http';
import {retry, catchError} from 'rxjs/operators';

import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {BASE_URL} from '../config/config';
import {ListeAttenteVueLogoModel} from './logopediste.model';


@Injectable({
  providedIn: 'root'
})

export class LogopedisteService {

  constructor(
    private httpClient: HttpClient
  ) {}


  getListeAttente(idLogo: number): Observable<ListeAttenteVueLogoModel> {
    return this.httpClient.get<ListeAttenteVueLogoModel>(BASE_URL + '/logopediste/' + idLogo + '/liste-attente').pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  refuserDemandeDeBilan(idListeAttente: number, idDemandeBilan: number): Observable<ListeAttenteVueLogoModel> {
    return this.httpClient.put<ListeAttenteVueLogoModel>(
      BASE_URL + '/logopediste/liste-attente/' + idListeAttente + '/demande/' + idDemandeBilan + '/refuser', {}
    ).pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  accepterDemandeDeBilan(idListeAttente: number, idDemandeBilan: number): Observable<ListeAttenteVueLogoModel> {
    return this.httpClient.put<ListeAttenteVueLogoModel>(
      BASE_URL + '/logopediste/liste-attente/' + idListeAttente + '/demande/' + idDemandeBilan + '/accepter', {}
    ).pipe(
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
