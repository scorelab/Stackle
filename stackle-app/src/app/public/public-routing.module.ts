import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent} from './login/login.component';
import { CallbackComponent} from './callback/callback.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'callback', component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
