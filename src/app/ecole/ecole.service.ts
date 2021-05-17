import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../config/config';
import {EcoleModel} from './ecole.model';

@Injectable({providedIn: 'root'})
export class EcoleService {

  constructor(private http: HttpClient) {}

  getEcoles() {
    return this.http.get<EcoleModel[]>(BASE_URL + '/ecoles');
  }
}
