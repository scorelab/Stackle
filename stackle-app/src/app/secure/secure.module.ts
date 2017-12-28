import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule} from '../material/material.module';

import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { PostComponent } from './shared/post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';


@NgModule({
  imports: [
    SecureRoutingModule,
    MaterialModule,
  ],
  declarations: [
    PostComponent,
    CreatePostComponent
  ],
  exports: [
    MaterialModule
  ]
})
export class SecureModule { }
