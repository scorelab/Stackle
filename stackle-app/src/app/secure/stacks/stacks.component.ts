import { Component, OnInit } from '@angular/core';
import { StackService } from '../../services/stack.service';
import { UserService } from '../../services/user.service';
import {stripSummaryForJitNameSuffix} from "@angular/compiler/src/aot/util";

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {

  private stacks;
  private user;

  constructor(
    private stackService: StackService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getAllOrgs(){
    this.stackService.getAllOrgs().subscribe( response => {
      console.log(response);
      this.stacks = [];
      this.stacks = response.result;
    })
  }

  getCurrentUser(){
    var user = localStorage.getItem('username');
    this.userService.getUser(user).subscribe( response => {
      this.user = response.result;
      console.log(response.result);
      this.getAllOrgs();
    })
  }

  subscribeToStack(stack){
    console.log(stack);

    if(!this.checkSubscription(stack)){
      console.log("subscribe");
      this.stackService.subscribeToStack(stack._id).subscribe( response => {
        this.getCurrentUser();
      })
    }else{
      console.log("unsubscribe");
      this.stackService.unsubscribeFromStack(stack._id).subscribe( response => {
        this.getCurrentUser();
      })
    }
  }

  checkSubscription(stack){
    return !!this.user.subscribedStacks.find(item => item._id === stack._id);
  }

}
