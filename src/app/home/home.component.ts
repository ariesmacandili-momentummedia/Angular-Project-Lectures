import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    firstObsSubscription: Subscription | any;

    constructor() { }

    ngOnInit() {
        // this.firstObsSubscription = interval(1000).subscribe((count) => {
        //     console.log(count);
        // });
        const customIntervalObservable = Observable.create((observer: any) => {
            let count = 0;
            setInterval(() => {
                observer.next(count);
                if (count === 2) {
                    observer.complete();
                }
                if (count > 3) {
                    observer.error(new Error('Count is greater 3!'));
                }
                count++;
            }, 1000);
        });

        this.firstObsSubscription = customIntervalObservable
            .pipe(map((data: number) => {  // map is an rxjs operator
                return 'Round: ' + (data + 1);
            }))
            .subscribe(
                (data : string) => {
                    console.log('observer.next() has been called');
                    console.log(data);
                },
                (error : Error) => {
                    console.log('observer.error() has been called');
                    console.error(error);
                },
                () => {
                    console.log('observer.complete() has been called');
                }
            );
    }

    ngOnDestroy(): void {
        this.firstObsSubscription.unsubscribe();
    }
}
