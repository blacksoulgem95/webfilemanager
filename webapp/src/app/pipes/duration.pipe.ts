import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment"

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: number): unknown {
    return moment.duration(value, 'milliseconds').humanize()
  }

}
