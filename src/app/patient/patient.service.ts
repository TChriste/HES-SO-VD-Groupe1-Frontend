import {HttpClient, HttpParams} from '@angular/common/http';
import {retry, catchError} from 'rxjs/operators';

import {Disponibilite, ListeAttente, PageListeAttente} from './patient.model';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {BASE_URL} from '../config/config';
import {DemandeDeBilanCrationModel, DemandeDeBilanModel} from './demande-suivi/demande-de-bilan.model';
import {RegionModel} from '../region/region.model';
import {SpecialisationModel} from '../specialisation/specialisation.model';


@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor(
    private httpClient: HttpClient,
  ) {}


  getListesAttente(page: number, region: RegionModel, specialisation: SpecialisationModel): Observable<PageListeAttente> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    if (region) {
      params = params.append('region', region.id.toString());
    }
    if (specialisation) {
      params = params.append('specialisation', specialisation.id.toString());
    }

    return this.httpClient.get<PageListeAttente>(BASE_URL + '/liste-attente', {params}).pipe(
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

  postDemandeDeBilan(demandeSuivi: DemandeDeBilanCrationModel): Observable<any> {
    return this.httpClient.post<any>(BASE_URL + '/patient/demande-suivi', demandeSuivi)
                          .pipe(catchError(this.processError));
  }

  getDemandesDeBilan(idPatient: number): Observable<any> {
    return this.httpClient.get<DemandeDeBilanModel[]>(BASE_URL + '/patient/' + idPatient + '/demandes-bilan')
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
