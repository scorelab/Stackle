import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

// material module
import { MaterialModule } from './material/material.module';
import { PublicModule } from './public/public.module';
import { SecureModule } from './secure/secure.module';

// services
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { StackService } from './services/stack.service';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { CommonFeedComponent } from './secure/common-feed/common-feed.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { LoginComponent } from './public/login/login.component';
import {PostComponent} from './secure/shared/post/post.component';


@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    SecureComponent,
    CommonFeedComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    PublicModule,
    SecureModule
  ],
  providers: [
    AuthService,
    PostService,
    StackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
