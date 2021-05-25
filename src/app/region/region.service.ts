import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../config/config';
import {RegionModel} from './region.model';

@Injectable({providedIn: 'root'})
export class RegionService {

  constructor(private http: HttpClient) {}

  getRegions() {
    return this.http.get<RegionModel[]>(BASE_URL + '/regions');
  }
}
