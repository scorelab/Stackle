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

  private subscribedStacks = [];
  private userAvatarUrl;
  public stackNameToSearch: String;
  public stackInfo: any;

  constructor(
    private auth: AuthService,
    private stackService: StackService,
    private router: Router,
    private profileService: ProfileService
  ) {
    auth.handleAuthentication();
   }

  ngOnInit() {

    this.stackService.getAllOrgsByUser().subscribe( response => {
        this.subscribedStacks = response.result;
    });

    this.getUserProfileAvatar();
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

  public getUserProfileAvatar() {
    this.profileService.getCurrentUserFromDB().subscribe( response => {
      this.userAvatarUrl = response.json().result.picUrl;
    })
  }

  public goToStack(stackName) {
    this.router.navigate(['app/stack'], { queryParams: { name: stackName }});
  }

  public onSearchSubmit(){
    let stackToSearch = {
      stackName: this.stackNameToSearch
    };
    console.log(stackToSearch);
    this.stackService.getStack(stackToSearch.stackName).subscribe((res)=>{
      console.log(res);
      if(res.success){
        this.stackInfo = res.result;
      }
    }, (err)=>{
      console.log(err);
    });
  }

}
