import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SecureRoutingModule, RoutedComponents} from './secure-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    SecureRoutingModule
  ],
  declarations: [DashboardComponent, RoutedComponents, ProfileComponent]
})
export class SecureModule { }
