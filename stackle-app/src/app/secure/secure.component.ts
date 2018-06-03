import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { StackService } from '../services/stack.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private stackService: StackService,
    private router: Router
  ) {
    auth.handleAuthentication();
   }

  ngOnInit() {
    this.stackService.getAllOrgs().subscribe((response)=> {
      console.log(response);
    });
    // this.stackService.getAllOrgs().subscribe(res => {
    //   console.log(res);
    // });
  }

  public navigateToCreatePost() {
    this.router.navigate(['app/createPost']);
  }

  public navigateToCommonFeed() {
    this.router.navigate(['app/commonFeed']);
  }


}
