import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-common-feed',
  templateUrl: './common-feed.component.html',
  styleUrls: ['./common-feed.component.css']
})

export class CommonFeedComponent implements OnInit {
  private loading = false;
  private posts;

  constructor(
    private router: Router,
    private postService: PostService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getAllPosts();
  }

  private navigateToPost(post_id) {
    this.router.navigate(['app/post/' + post_id]);
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(response => {
      // this.loading = true;
      this.posts = response.json().result;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  voteUp(id) {
    this.userService.getUser(localStorage.getItem('username')).subscribe((data) => {
    //we have to push object id from document of this user so we have to pass that object id to backed
    // we also have changed postService
      this.postService.voteUp(id,data.result._id).subscribe(response => {
        this.getAllPosts();
      });
    }, (err) => {

    }, () => {
      console.log("Completed");
    });

  }

}
