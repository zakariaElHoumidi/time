import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKey',
  standalone: true
})
export class ObjectKeyPipe implements PipeTransform {
  transform(value: any): string[] {
    return value ? Object.keys(value) : [];
  }
}
