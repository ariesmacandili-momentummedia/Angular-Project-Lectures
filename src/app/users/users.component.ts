import { Component } from '@angular/core';
import { User } from './user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent {
    users: User[] = [
        {
            id: 1,
            name: 'Max'
        },
        {
            id: 2,
            name: 'Anna'
        },
        {
            id: 3,
            name: 'Chris'
        }
    ];
}
