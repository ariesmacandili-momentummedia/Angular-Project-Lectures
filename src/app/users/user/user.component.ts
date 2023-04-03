import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: User = { id: 1, name: 'test' };

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.user = {
            id    : this.route.snapshot.params['id'],
            name  : this.route.snapshot.params['name']
        };
    }
}
