import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { Subject, catchError, throwError , map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    apiUrl = 'https://udemy-angular-tutorial-5331a-default-rtdb.asia-southeast1.firebasedatabase.app';

    loadedPosts: Post[] = [];

    isFetchingPosts = new Subject<boolean>();

    error$ = new Subject<string>();

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
            .get<{ [key: string]: Post }>(
                `${this.apiUrl}/posts.json`,
                {
                    headers: new HttpHeaders({
                        'Custom-Header': 'Hello'
                    }),
                    params: {
                        print: 'pretty'
                    }
                }
            )
            .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)))
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

    handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }

        // We can use the throwError observable to perform some other logic (like saving to analytics server, etc.).
        return throwError(() => {
            // We can also emit the Subject property and handle errors in the component-level.
            this.error$.next('Something bad happened, please try again later.');

            // This throws a "console.error".
            return new Error('Something bad happened, please try again later.');
        });
    }
}
