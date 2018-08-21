import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import {MatChipInputEvent} from '@angular/material';
import { MatSnackBar } from '@angular/material'
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  private username ;
  private postObject;
  private separatorKeyCodes;
  private loading = false;
  private subscribedStacks;

  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.postObject = {};
    this.postObject.tags = [];
    this.postObject.votes = 0;
    this.separatorKeyCodes = [ENTER, COMMA];
    this.subscribedStacks = [];
    this.getSubscribedStacks();
  }


  createPost = () => {
    if(this.postObject.title == "" || this.postObject.title == undefined){
      this.showSnackBar('Please enter a title!');
    }else if(this.postObject.org_name == "" || this.postObject.org_name == undefined){
      this.showSnackBar('Please enter an organization name!');
    }else if(this.postObject.repository == "" || this.postObject.repository == undefined){
      this.showSnackBar('Please enter a repository!');
    }else if(this.postObject.description == "" || this.postObject.description == undefined){
      this.showSnackBar('Please enter a description!');
    }

    else {
      this.postObject.date = new Date();
      this.postObject.user = localStorage.getItem('username');
      this.loading = true;
      this.postService.createPost(this.postObject).subscribe( response => {
        if(response.status == 200){
            this.showSnackBar('Post created!');
            this.router.navigate(['app/commonFeed']);
        }else{
            this.showSnackBar('Could not create post!');
        }
      })
    }
  };

  clear = () => {
    this.postObject.title = "";
    this.postObject.org_name = "";
    this.postObject.repository = "";
    this.postObject.issue = "";
    this.postObject.description = "";
  };

  addTag(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if((value || '').trim()){
      this.postObject.tags.push({name: value.trim()});
    }

    if(input){
      input.value = '';
    }
  }

  removeTag(tag: any): void {
    let index = this.postObject.tags.indexOf(tag);

    if(index >= 0){
      this.postObject.tags.splice(index,1);
    }
  }

  showSnackBar(message:string) {
    this.snackBar.open(message, null, {
      duration: 2000
    })
  }

  getSubscribedStacks(){
    this.userService.getUser(localStorage.getItem('username')).subscribe(response => {
      this.subscribedStacks = response.result.subscribedStacks;
    })
  }

}
