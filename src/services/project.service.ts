import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Project} from '../app/data/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpService: HttpClient) { }

  getProjects(): Observable<Project[]>  {
    return this.httpService.get<Project[]>('../assets/json/projects.json');
  }
}
