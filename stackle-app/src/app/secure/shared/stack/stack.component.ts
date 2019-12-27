import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {

  public loading = false;
  public posts: any = [];
  private orgName;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit() {

    this.loading = true;

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.orgName = params['name'];

      if(this.orgName === "" || this.orgName === undefined){
        this.router.navigate(['app/commonFeed']);
        return;
      }

      this.getPosts(this.orgName);

    })

  }

  getPosts(orgName) {
    this.postService.getAllPostsByOrg(orgName).subscribe(response => {
      console.log("response", response)
      this.posts = response.json().result;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  public navigateToPost(post_id) {
    this.router.navigate(['app/post/'+post_id]);
  }

}
