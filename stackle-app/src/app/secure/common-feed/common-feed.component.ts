import { Component, OnInit } from '@angular/core';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-common-feed',
  templateUrl: './common-feed.component.html',
  styleUrls: ['./common-feed.component.css']
})
export class CommonFeedComponent implements OnInit {
  private loading:boolean = false;
  private posts;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.postService.getAllPosts().subscribe(response => {
      // this.loading = true;
      console.log(response.json());
      this.posts = response.json();
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    })
  }

}
