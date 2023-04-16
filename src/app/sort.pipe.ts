import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name : 'sort',
    pure : false
})
export class SortPipe implements PipeTransform {
    transform(values: any, ...args: any[]): any {
        return values.sort((a: any, b: any) => (a[args[0]] > b[args[0]]) ? 1 : -1);
    }
}
