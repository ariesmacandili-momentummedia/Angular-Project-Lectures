import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
                'email'    : new FormControl(
                    null,
                    [Validators.required, Validators.email],
                    this.forbiddenEmails.bind(this)  // It is mandatory to use bind and add "this".
                ),
                'gender'   : new FormControl('Male')
            }),
            'hobbies'  : new FormArray([])
        });

        // Observing the changes to the entire FormGroup instance.
        this.signupForm.valueChanges.subscribe((formValues: Object) => {
            console.log(formValues);
        });

        // Observing the changes on an individual FormControl inside the FormGroup instance.
        this.signupForm.get('userData.username')?.valueChanges.subscribe((value) => {
            console.log(value);
        });

        // Observing the validity status of the entire FormGroup instance.
        this.signupForm.statusChanges.subscribe((formValues: Object) => {
            console.log(formValues);
        });

        // Observing the validity status of an individual FormControl inside the FormGroup instance.
        this.signupForm.get('userData.username')?.statusChanges.subscribe((value) => {
            console.log(value);
        });

        // this.signupForm.patchValue({
        //     'userData': {
        //         'username': 'Max'
        //     }
        // });
    }

    forbiddenNames(control: FormControl): {[s: string]: boolean} | null { // Signature is mandatory.
        if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
            return {'nameIsForbidden': true}; // The key is the name of the short error code. Key name can be anything.
        }
        return null; // This is fixed as Angular's spec. If null is returned, it means that the validation is passed.
    }

    forbiddenEmails(control: AbstractControl): Promise<any> | Observable<any> {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'test@test.com') {
                    resolve({'emailIsForbidden': true});
                } else {
                    resolve(null);
                }
            }, 1500);
        });
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
