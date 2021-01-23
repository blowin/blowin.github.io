import {Component, Input, OnChanges} from '@angular/core';
import {Place} from '../data/place';
import * as moment from 'moment';

export default moment;

export class TimelineCard {
  inverted: boolean;
  imgClass: string;
  class: string;
  imgColorClass: string;
  title: string;
  content: string[];

  additionalHeaderTitle: string;
  additionalHeaderTitleImgClass: string;

  additionalHeaderTitleStyleClass: string = TimelineCard.defaultAdditionalHeaderTitleStyleClass();

  static defaultAdditionalHeaderTitleStyleClass(): string {
    return 'text-muted';
  }
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnChanges {

  @Input() places: Place[];

  timelineCards: TimelineCard[];

  constructor() {
    this.timelineCards = null;
  }


  private static getContent(place: Place): string[] {
    const result: string[] = [];
    if (place.description != null) {
      result.push(place.description);
    }

    if (place.technologies != null && place.technologies.length > 0) {
      // New line
      if (result.length > 0) {
        result.push('');
      }

      result.push('Технологии:');
      result.push(place.technologies.join(', '));
    }

    return result;
  }

  ngOnChanges(): void {
    if (this.places == null) {
      return;
    }

    this.timelineCards = this.places.map((place, idx) => {
      const res = new TimelineCard();
      const inverted = idx % 2 === 0;
      res.title = place.company;
      res.inverted = inverted;
      res.content = TimelineComponent.getContent(place);
      res.additionalHeaderTitle = place.formatWorkRange();
      res.imgColorClass = place.getOptionalEndDate().HasValue ? 'info' : 'success';
      res.imgClass = 'fal fa-briefcase';
      res.class = inverted ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft';
      return res;
    });
  }

  cardClass(card: TimelineCard): string {
    return card.inverted ? 'timeline-inverted' : '';
  }

  getTimelineHeader(): string {
    const startDateSeq = this.places.filter((place) => place.isWork).map((place) => place.startDate);
    const endDateSeq = this.places.filter((place) => place.isWork).map((place) => place.endDate == null ? Date.now() : place.endDate);

    const minStartDate = new Date(Math.min.apply(null, startDateSeq));
    const maxEndDate = new Date(Math.max.apply(null, endDateSeq));
    const month = moment(moment(maxEndDate).diff(minStartDate)).month() + 1;
    const year = Math.trunc(moment(maxEndDate).diff(minStartDate, 'year', true));

    return `Опыт разработки ${(year)} ${this.formatYear(year)} ${month} ${this.formatMonth(month)}`;
  }

  formatYear(year: number): string {
    switch (year){
      case 1:
        return 'год';
      case 2:
      case 3:
      case 4:
        return 'года';
      default:
        return 'лет';
    }
  }

  formatMonth(month: number): string {
    switch (month) {
      case 1:
        return 'месяц';
      case 2:
      case 3:
      case 4:
        return 'месяца';
      default:
        return 'месяцев';
    }
    return null;
  }
}
