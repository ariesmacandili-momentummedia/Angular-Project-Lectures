import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userActivated = new EventEmitter<boolean>();

    constructor() { }
}
