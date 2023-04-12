import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    genders = ['Male', 'Female'];
    signupForm = <FormGroup>{};
    forbiddenUsernames = ['Chris', 'Anna'];

    ngOnInit() {
        this.signupForm = new FormGroup({
            'userData' : new FormGroup({
                'username' : new FormControl(null, [
                    Validators.required,
                    this.forbiddenNames.bind(this) // It is mandatory to use bind and add "this".
                ]),
                'email'    : new FormControl(null, [Validators.required, Validators.email]),
                'gender'   : new FormControl('Male')
            }),
            'hobbies'  : new FormArray([])
        });
    }

    forbiddenNames(control: FormControl): {[s: string]: boolean} | null { // Signature is mandatory.
        if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
            return {'nameIsForbidden': true}; // The key is the name of the short error code. Key name can be anything.
        }
        return null; // This is fixed as Angular's spec. If null is returned, it means that the validation is passed.
    }

    get hobbyControls() {
        return (<FormArray>this.signupForm.get('hobbies')).controls;
    }

    onAddHobby() {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.signupForm.get('hobbies')).push(control);
    }

    onSubmit() {
        console.log(this.signupForm.value);
    }
}
