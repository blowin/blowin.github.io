import {Optional} from './optional';

export class Place {
  company: string;
  technologies: string[];
  description: string;
  startDate: Date;
  endDate: Date;
  isWork: boolean;

  public getOptionalEndDate(): Optional<Date> {
    return this.endDate == null ?
      Optional.None<Date>() :
      Optional.Some<Date>(this.endDate);
  }

  public formatWorkRange(): string {
    const endDate = this.getOptionalEndDate();
    return this.startDate.getFullYear() + ' - ' +
      (endDate.HasValue ? endDate.Value.getFullYear() : 'по настоящее время');
  }
}
