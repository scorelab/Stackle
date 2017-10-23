import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SecureRoutingModule, RoutedComponents} from './secure-routing.module';

import { SecureComponent} from './secure.component';

@NgModule({
  imports: [
    CommonModule,
    SecureRoutingModule
  ],
  declarations: [RoutedComponents, SecureComponent]
})
export class SecureModule { }
