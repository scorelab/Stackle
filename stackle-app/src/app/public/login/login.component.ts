import { Component, OnInit } from '@angular/core';
import * as Auth0Lock from 'auth0-lock';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) {
    // Comment out this method call if using
    // hash-based routing
    auth.handleAuthentication();

    // Uncomment this method call if using
    // hash-based routing
    // auth.handleAuthenticationWithHash();
  }

  ngOnInit() {
  }


  login() {
    window.location.replace('http://localhost:8080/login');
  }

}
