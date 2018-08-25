import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { StackService } from '../services/stack.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

private profileObj:any;

  constructor(
    private auth: AuthService,
    private stackService: StackService,
    private profileService: ProfileService,
    private router: Router
  ) {
    auth.handleAuthentication();
   }

  ngOnInit() {
    this.stackService.getAllOrgs().subscribe((response)=> {});
    this.profileObj = {};
    this.getProfileObj();
  }
  
  getProfileObj() {
    let username = 'ntbandara3'
    this.profileService.getProfileObject(username).subscribe(response => {
      this.profileObj = JSON.parse(response['_body']);
    }, error => {
        console.error(error)
    });
  }
  
  public navigateToCreatePost() {
    this.router.navigate(['app/createPost']);
  }

  public navigateToCommonFeed() {
    this.router.navigate(['app/commonFeed']);
  }


}
