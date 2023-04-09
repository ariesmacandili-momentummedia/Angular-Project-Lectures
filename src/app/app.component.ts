import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('userForm') userForm = {} as NgForm;

    suggestUserName() {
        const suggestedName = 'Superuser';
    }

    onSubmit() {
        console.log('Submitted!');
        console.log(this.userForm.value);
    }
}
