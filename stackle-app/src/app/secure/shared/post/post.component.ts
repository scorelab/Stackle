import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { MatSnackBar } from '@angular/material';
import {ProfileService} from "../../../services/profile.service";
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private postId;
  private post;
  private loading = false;
  private commentObject;
  private replyObject;

  constructor(
    private postService: PostService,
    private profileService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.post = {};
    this.post.comments = [];
    this.loading = true;
    this.commentObject = {};
    this.replyObject = {};
    this.commentObject.votes = 0;
    //Set User
    this.commentObject.user = localStorage.getItem('username');
    this.replyObject.user = localStorage.getItem('username');
    this.activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
      this.getPostData();
    });
  }

  getPostData() {
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = null;
      this.post = post.json().result;
      this.loading = false;
    });
  }

  postComment(){
    // validate post content
    if(this.commentObject.description === undefined || this.commentObject.description === ""){
      this.showSnackBar("Please enter comment text");
    }else {

      this.commentObject.date = new Date();
      this.postService.postComment(this.postId, this.commentObject).subscribe( response => {
        this.commentObject.description = "";
        this.getPostData();
      })

    }

  }

  voteOnPost(){
    this.userService.getUser(localStorage.getItem('username')).subscribe((data) => {
      this.postService.voteUp(this.postId,data.result._id).subscribe(response => {
        this.getPostData();
      });
    }, (err) => {

    }, () => {
      console.log("Completed");
    });
  }

  voteUpOnComment(id){
      this.postService.voteUpOnComment(id).subscribe( response => {
        this.getPostData();
      })
  }

  voteDownOnComment(id){
      this.postService.voteDownOnComment(id).subscribe( response => {
        this.getPostData();
      })
  }

  replyOnComment(id){
    if(this.replyObject.description === undefined || this.replyObject.description === ""){
      this.showSnackBar("Please enter reply text");
    }else{
      this.replyObject.date = new Date();
      this.postService.replyOnComment(id, this.replyObject).subscribe(response => {
        this.replyObject.description = "";
        this.getPostData();
      })
    }
  }

  showSnackBar(message:string) {
    this.snackBar.open(message, null, {
      duration: 2000
    })
  }

}
