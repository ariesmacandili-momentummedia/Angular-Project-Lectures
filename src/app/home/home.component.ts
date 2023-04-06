import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(
        private router: Router,
        public authService: AuthService
    ) { }

    ngOnInit() {
    }

    onLoadServer(serverId: number) {
        // complex calculations
        this.router.navigate(
            ['/servers', serverId, 'edit'], // route params
            { // query params and fragment params
                queryParams: {
                    allowEdit: '1'
                },
                fragment: 'loading'
            }
        );
    }

    onLogin() {
        this.authService.login();
    }

    onLogout() {
        this.authService.logout();
    }
}
