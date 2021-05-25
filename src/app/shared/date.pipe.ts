import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: Date): unknown {
    return moment(value).format('DD.MM.YYYY');
  }

}
