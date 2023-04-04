import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    paramsSubscription: Subscription;
    user: User = { id: 1, name: 'test' };

    constructor(
        private route: ActivatedRoute
    ) {
        this.paramsSubscription = this.route.params.subscribe(
            (params: Params) => {
                this.user.id   = params['id'];
                this.user.name = params['name'];
            }
        );
    }

    ngOnInit() {
        this.user = {
            id    : this.route.snapshot.params['id'],
            name  : this.route.snapshot.params['name']
        };
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }
}
