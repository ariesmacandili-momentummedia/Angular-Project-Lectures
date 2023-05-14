import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';

const routes: Route[] = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'about',
        // component: AboutComponent
        loadComponent: () => import('./about/about.component').then((comp) => comp.AboutComponent)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-routes').then((route) => route.DASHBOARD_ROUTES)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
