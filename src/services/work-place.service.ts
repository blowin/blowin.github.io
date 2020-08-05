import { Injectable } from '@angular/core';
import {Place} from '../app/data/place';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkPlaceService {

  constructor(private httpService: HttpClient) { }

  getPlaces(): Observable<Place[]> {
    return this.httpService.get<Place[]>('../assets/json/work.json');
  }
}
