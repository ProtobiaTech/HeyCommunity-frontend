import {Pipe, PipeTransform} from '@angular/core';
import Moment from 'moment';


@Pipe({
    name: 'moment',
    pure: false,
})
export class MomentPipe implements PipeTransform {
  transform(d:Date | Moment.Moment, args?:any[]):string {
    // utc add 8 hours into beijing
    let rv = Moment(d).add(8, 'hours').format(args[0]);
    return rv;
  }
}


@Pipe({
    name: 'timeago',
    pure: false,
})
export class TimeagoPipe implements PipeTransform {
  transform(d:Date | Moment.Moment):string {
    // utc add 8 hours into beijing
    let rv = Moment(d).add(8, 'hours').fromNow();
    return rv;
  }
}
