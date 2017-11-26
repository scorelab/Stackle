import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule} from '../material/material.module';

import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { PostComponent } from './shared/post/post.component';


@NgModule({
  imports: [
    SecureRoutingModule,
    MaterialModule,
  ],
  declarations: [
    PostComponent
  ],
  exports: [
    MaterialModule
  ]
})
export class SecureModule { }
