import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { Post } from './interfaces/post.interface';
import { PostsService } from './services/posts.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    form = {} as FormGroup;

    loadedPosts: Post[] = [];

    isFetchingPosts = true;

    apiUrl = 'https://udemy-angular-tutorial-5331a-default-rtdb.asia-southeast1.firebasedatabase.app';

    constructor(private postsService: PostsService) { }

    ngOnInit() {
        this.form = new FormGroup({
            title   : new FormControl(null, { validators: [Validators.required] }),
            content : new FormControl(null, { validators: [Validators.required] })
        });

        this.onFetchPosts();

        this.postsService.isFetchingPosts.subscribe((isFetching) => {
            this.isFetchingPosts = isFetching;
            if (isFetching === false) {
                this.loadedPosts = this.postsService.loadedPosts;
            }
        });
    }

    onCreatePost() {
        this.postsService.createPost(this.form.value);
    }

    onFetchPosts() {
        this.postsService.fetchPosts();
    }

    onClearPosts() {
        this.loadedPosts = [];
    }
}
