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

    errorMessage = '';

    constructor(private postsService: PostsService) { }

    ngOnInit() {
        this.form = new FormGroup({
            title   : new FormControl(null, { validators: [Validators.required] }),
            content : new FormControl(null, { validators: [Validators.required] })
        });

        this.onFetchPosts();

        this.postsService.error$.subscribe((error: string) => {
            this.errorMessage = error;
        });

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
        this.postsService.deletePosts();
    }

    onHandleError() {
        this.errorMessage = '';
        this.isFetchingPosts = false;
    }
}
