import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name : 'filter',
    pure : false
})
export class FilterPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        let [filterString, status] = args;
        if (value.length === 0 || filterString === '') {
            return value;
        }

        let resultArray = [];
        for (let item of value) {
            if (item[status] === filterString) {
                resultArray.push(item);
            }
        }

        return resultArray;
    }
}
