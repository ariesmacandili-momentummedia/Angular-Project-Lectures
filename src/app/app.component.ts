import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from './interfaces/post.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    form = {} as FormGroup;

    loadedPosts: Post[] = [];

    apiUrl = 'https://udemy-angular-tutorial-5331a-default-rtdb.asia-southeast1.firebasedatabase.app';

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.form = new FormGroup({
            title   : new FormControl(null, { validators: [Validators.required] }),
            content : new FormControl(null, { validators: [Validators.required] })
        });

        this.fetchPosts();
    }

    onCreatePost() {
        // Send Http request
        this.http
            .post(`${this.apiUrl}/posts.json`, this.form.value)
            .subscribe((response) => {
                console.log(response)
            });

        this.loadedPosts.push(this.form.value);
    }

    onFetchPosts() {
        // Send Http request
        this.fetchPosts()
    }

    onClearPosts() {
        // Send Http request
        this.loadedPosts = [];
    }

    private fetchPosts() {
        // Send Http request
        this.http
            .get(`${this.apiUrl}/posts.json`)
            .subscribe((response) => {
                this.loadedPosts = [];
                for (const data of Object.values(response)) {
                    this.loadedPosts.push(data);
                }
            });
    }
}
