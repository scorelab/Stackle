import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';



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

  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  constructor(
    private postService: PostService,
    // private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.postObject = {};
    this.postObject.tags = [];
    this.postObject.votes = 0;
    this.separatorKeyCodes = [ENTER, COMMA];
  }


  createPost = () => {
    console.log("create post called");

    if(this.postObject.title == "" || this.postObject.title == undefined){

    }else if(this.postObject.org_name == "" || this.postObject.org_name == undefined){

    }else if(this.postObject.repository == "" || this.postObject.repository == undefined){

    }else {
      this.postObject.date = new Date();
      this.postObject.user = "smpuser";
      this.loading = true;
      this.postService.createPost(this.postObject).subscribe( response => {
        console.log(response);
        if(response.status == 200){

        }else{

        }
        // this.showSnackBar("Post created!");
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

  // showSnackBar(message:String) {
  //   this.snackBar.open(message, {
  //     duration: 2000
  //   })
  // }
}
