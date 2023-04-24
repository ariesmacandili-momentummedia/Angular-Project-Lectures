import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
    declarations: [AppComponent, PostComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [{
        provide  : HTTP_INTERCEPTORS,
        useClass : AuthInterceptorService,
        multi    : true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
