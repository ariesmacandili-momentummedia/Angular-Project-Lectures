import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    form = {} as FormGroup;

    loadedPosts = [];

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.form = new FormGroup({
            title   : new FormControl(null, { validators: [Validators.required] }),
            content : new FormControl(null, { validators: [Validators.required] })
        });
    }

    onCreatePost() {
        // Send Http request
        console.log(this.form.value);
    }

    onFetchPosts() {
        // Send Http request
    }

    onClearPosts() {
        // Send Http request
    }
}
