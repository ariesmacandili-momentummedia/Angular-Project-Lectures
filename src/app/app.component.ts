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

    submitted = false;

    user = {
        username: '',
        email: '',
        gender: '',
        secretQuestion: '',
        secretAnswer : ''
    }

    suggestUserName() {
        const suggestedName = 'Superuser';
        this.userForm.form.patchValue({
            userData: {
                username: suggestedName
            }
        });
    }

    onSubmit() {
        this.submitted = true;

        this.user.username = this.userForm.value.userData.username;
        this.user.email = this.userForm.value.userData.email;
        this.user.gender = this.userForm.value.userData.gender;
        this.user.secretQuestion = this.userForm.value.secret;
        this.user.secretAnswer = this.userForm.value.questionAnswer;

        this.userForm.reset();
    }
}
