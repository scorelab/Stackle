import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PostService } from '../../../services/post.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  private postId;
  private post;
  private loading: boolean = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
      // console.log(this.postId);
      this.postService.getPost(this.postId).subscribe(post => {
        this.post = post.json();
        console.log(post.json());
        this.loading = false;
      });
    });

  }

}
