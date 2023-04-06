import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
    loggedIn = false;

    isAuthenticated(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.loggedIn);
            }, 1000);
        });
    }

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }
}
