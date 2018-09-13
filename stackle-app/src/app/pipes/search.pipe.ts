import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchKey: string): any {
    if(!items) return[];
    if(!searchKey) return items;

    searchKey = searchKey.toLowerCase();

    return items.filter(item => {
      return item.toLowerCase().includes(searchKey);
    });
  }

}
