import { Component } from '@angular/core';
import {WorkPlaceService} from '../services/work-place.service';
import {ProjectService} from '../services/project.service';
import {Place} from './data/place';
import {Project} from './data/project';

import {Link} from './data/link';

interface LinkButton {
  iconClass: string;
  href: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  linkButtons: LinkButton[] = [
    { iconClass: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/dmitry-sushchevsky/' },
    { iconClass: 'fab fa-instagram', href: 'https://www.instagram.com/icyicebrrg/' },
    { iconClass: 'fab fa-github', href: 'https://github.com/blowin' },
    { iconClass: 'fab fa-telegram', href: 'https://t.me/kolvice/' }
  ];

  places: Place[];
  projects: Project[];

  constructor(private placeService: WorkPlaceService, private projectService: ProjectService) {
    placeService.getPlaces().subscribe((data: Place[]) => {
      this.places = data.map((it) => {
        const place = new Place();
        place.company = it.company;
        place.description = it.description;
        place.endDate = it.endDate != null ? new Date(Date.parse(it.endDate.toString())) : null;
        place.isWork = it.isWork;
        place.technologies = it.technologies;
        place.startDate = new Date(Date.parse(it.startDate.toString()));
        return place;
      });
    });

    projectService.getProjects().subscribe((data) => {
      this.projects = data.map((it) => {
        const project = new Project();
        if (it.sourceCodeUrl != null) {
          project.sourceCodeUrl = new Link();
          project.sourceCodeUrl.url = it.sourceCodeUrl.url;
          project.sourceCodeUrl.name = it.sourceCodeUrl.name;
        }

        project.description = it.description;
        project.language = it.language;
        project.name = it.name;
        return project;
      });
    });
  }

  getCurrentJob(): Place {
    if (this.places == null) {
      return null;
    }

    const result = this.places.find((place) => !place.getOptionalEndDate().HasValue);
    return result === undefined ? null : result;
  }
}
