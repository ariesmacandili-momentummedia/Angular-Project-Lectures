import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('userForm') userForm = {} as NgForm;

    answer = '';

    genders = ['Male', 'Female'];

    suggestUserName() {
        const suggestedName = 'Superuser';
        this.userForm.form.patchValue({
            userData: {
                username: suggestedName
            }
        });
    }

    onSubmit() {
        console.log('Submitted!');
        console.log(this.userForm.value);
        console.log(this.userForm.valid);
    }
}
