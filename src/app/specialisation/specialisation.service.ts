import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../config/config';
import {SpecialisationModel} from './specialisation.model';

@Injectable({providedIn: 'root'})
export class SpecialisationService {

  constructor(private http: HttpClient) {}

  getSpecialisations() {
    return this.http.get<SpecialisationModel[]>(BASE_URL + '/specialisations');
  }
}
