import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  private postId;
  private post;
  private loading = false;
  private commentObject;

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.post = {};
    this.post.comments = [];
    this.loading = true;
    this.commentObject = {};
    // this.commentObject.description = "test";
    this.commentObject.votes = 0;
    //Demo User
    this.commentObject.user = "smpuser";
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
    //TODO: check user - vote up/down
    this.postService.voteUp(this.postId).subscribe( response => {
      this.getPostData();
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

  }

  showSnackBar(message:string) {
    this.snackBar.open(message, null, {
      duration: 2000
    })
  }

}
