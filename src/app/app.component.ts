import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector    : 'app-root',
    templateUrl : './app.component.html',
    styleUrls   : ['./app.component.css']
})
export class AppComponent implements OnInit {
    form = <FormGroup>{};

    ngOnInit() {
        this.form = new FormGroup({
            'projectName'   : new FormControl(null, Validators.required, this.validateProjectName.bind(this)),
            'email'         : new FormControl(null, [Validators.required, Validators.email]),
            'projectStatus' : new FormControl('Stable')
        });
    }

    validateProjectName(control: AbstractControl): Promise<any> | Observable<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let resolveValue = null;
                if (control.value === 'Test') {
                    resolveValue = { 'projectNameIsForbidden' : true };
                }
                resolve(resolveValue);
            }, 1500);
        });
    }

    onSubmit() {
        console.log(this.form.value);
    }
}
