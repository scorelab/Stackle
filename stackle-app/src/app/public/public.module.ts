import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { PublicRoutingModule } from './public-routing.module';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule
  ],
  declarations: [CallbackComponent]
})
export class PublicModule { }
