import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule
  ],
  declarations: []
})
export class PublicModule { }
