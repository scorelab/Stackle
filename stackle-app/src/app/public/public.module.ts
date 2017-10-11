import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { PublicRoutingModule, RoutedComponents} from './public-routing.module'

import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule
  ],
  declarations: [LoginComponent, RoutedComponents]
})
export class PublicModule { }
