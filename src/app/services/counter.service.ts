import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CounterService {

    activeCounter = 0;
    inactiveCounter = 0;

    constructor() { }

    incrementActiveCounter() {
        console.log(`Inactive to Active Count: ${++this.activeCounter}`);
    }

    incrementInactiveCounter() {
        console.log(`Active to Inactive Count: ${++this.inactiveCounter}`);
    }
}
