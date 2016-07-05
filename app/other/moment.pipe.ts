import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';


@Pipe({
    name: 'moment',
    pure: false,
})
export class MomentPipe implements PipeTransform {
    transform(d:Date | moment.Moment, args?:any[]):string {
        let rv = moment(d).format(args[0]);
        return rv;
    }
}

@Pipe({
    name: 'timeago',
    pure: false,
})
export class TimeagoPipe implements PipeTransform {
    transform(d:Date | moment.Moment):string {
        let rv = moment(d).fromNow();
        return rv;
    }
}
