import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    userActivated = false;
    activatedSub : Subscription | any;

    constructor(
        private userService : UserService
    ) {}

    ngOnInit() {
        this.activatedSub = this.userService.userActivated.subscribe((didActivate: boolean) => {
            this.userActivated = didActivate;
        });
    }

    ngOnDestroy(): void {
        this.activatedSub.unsubscribe();
    }
}
