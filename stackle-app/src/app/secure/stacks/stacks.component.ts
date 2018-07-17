import { Component, OnInit } from '@angular/core';
import { StackService } from '../../services/stack.service';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {

  private stacks;
  private user;

  constructor(
    private stackService: StackService
  ) { }

  ngOnInit() {
    this.getAllOrgs();
  }

  getAllOrgs(){
    this.stackService.getAllOrgs().subscribe( response => {
      console.log(response);
      this.stacks = response.result;
    })
  }

  getCurrentUser(){
    //TODO: get current user
  }

  subscribeToStack(stackId){
    this.stackService.subscribeToStack(stackId, 123).subscribe( response => {
      this.getAllOrgs();
    })
  }

}
