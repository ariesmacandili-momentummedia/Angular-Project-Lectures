import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { Subject, filter, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    apiUrl = 'https://udemy-angular-tutorial-5331a-default-rtdb.asia-southeast1.firebasedatabase.app';

    loadedPosts: Post[] = [];

    isFetchingPosts = new Subject<boolean>();

    constructor(private httpClient: HttpClient) {}

    createPost(postData: { title: string; content: string }) {
        // Send Http request
        return this.httpClient
            .post<{ name: string }>(`${this.apiUrl}/posts.json`, {
                title   : postData.title,
                content : postData.content
            })
            .subscribe((response) => {
                this.loadedPosts.push(postData);
            });
    }

    fetchPosts() {
        this.isFetchingPosts.next(true);
        this.httpClient
            .get<{ [key: string]: Post }>(`${this.apiUrl}/posts.json`)
            .pipe(map((responseData) => {
                let postsArray: Post[] = [];

                if (responseData === null) {
                    return postsArray;
                }

                for (const data of Object.values(responseData)) {
                    postsArray.push(data);
                }
                return postsArray;
            }))
            .subscribe((posts: Post[]) => {
                this.loadedPosts = posts;
                this.isFetchingPosts.next(false);
            });
    }

    deletePosts() {
        return this.httpClient
            .delete(`${this.apiUrl}/posts.json`)
            .subscribe(() => {
                this.loadedPosts = [];
                this.isFetchingPosts.next(false);
            });
    }
}
