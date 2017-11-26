import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecureComponent } from './secure.component'
import { ProfileComponent } from './profile/profile.component';
import { CommonFeedComponent } from './common-feed/common-feed.component';
import { PostComponent} from './shared/post/post.component';



const routes: Routes = [
        {
            path : 'profile', component : ProfileComponent
        },
        {
            path : 'commonFeed', component : CommonFeedComponent
        },
        {
            path: 'post/:id', component : PostComponent
        }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SecureRoutingModule { }
