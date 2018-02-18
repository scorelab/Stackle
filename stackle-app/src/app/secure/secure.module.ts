import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule} from '../material/material.module';
import { FormsModule } from '@angular/forms'

import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { PostComponent } from './shared/post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CategoryComponent } from './create-post/category/category.component';


@NgModule({
  imports: [
    SecureRoutingModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    PostComponent,
    CreatePostComponent,
    CategoryComponent
  ],
  exports: [
    MaterialModule
  ]
})
export class SecureModule { }
