import { Pipe, PipeTransform } from '@angular/core';
import { Animals } from '../interfaces/animals.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: Animals[] | null, filter: string): Animals[] | undefined {
    return array?.filter(el => el.breeds ?  el.breeds[0].name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) : el)
  }

}
