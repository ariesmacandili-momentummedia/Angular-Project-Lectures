import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DetailsComponent } from './welcome/details/details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
    declarations : [
        AppComponent,
        WelcomeComponent,
        DetailsComponent
    ],
    imports      : [
        BrowserModule,
        SharedModule
    ],
    providers    : [

    ],
    bootstrap    : [
        AppComponent
    ]
})
export class AppModule { }
