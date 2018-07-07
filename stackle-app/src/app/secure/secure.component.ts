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

    });

    // this.stackService.getAllOrgsByUser().subscribe( response => {
    //   console.log(response);
    // }
  }

  public navigateToCreatePost() {
    this.router.navigate(['app/createPost']);
  }

  public navigateToCommonFeed() {
    this.router.navigate(['app/commonFeed']);
  }

  public navigateToCreateStack() {
    this.router.navigate(['app/createStack']);
  }

  public navigateToStacks() {
    this.router.navigate(['app/stacks']);
  }


}
