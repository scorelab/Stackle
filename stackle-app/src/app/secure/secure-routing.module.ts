import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import {FeedComponent} from './dashboard/feed/feed.component';
import { SecureComponent } from './secure.component';

// const routes: Routes = [
//     { path: 'dashboard', component: DashboardComponent },
//     { path: '/dashboard/profile', component: ProfileComponent }
// ];

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'feed', component: FeedComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class SecureRoutingModule {

}

export const RoutedComponents = [
    DashboardComponent,
    ProfileComponent,
    SecureComponent,
    FeedComponent
];
