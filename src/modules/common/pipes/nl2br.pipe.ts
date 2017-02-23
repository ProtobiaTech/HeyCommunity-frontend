import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'nl2br',
})
export class Nl2brPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    return value.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
}
