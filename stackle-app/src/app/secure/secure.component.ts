import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public navigateToCreatePost(){
    this.router.navigate(['app/createPost']);
  }


}
