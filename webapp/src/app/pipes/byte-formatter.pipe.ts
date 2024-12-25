import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byte',
  standalone: true,
})
export class ByteFormatterPipe implements PipeTransform {
  transform(bytes: number | undefined): unknown {

    if (!bytes || bytes === 0) return '0 Byte';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  }
}
