import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private profileObject;

  constructor(
    private gitHubService: GithubService
  ) { }

  ngOnInit() {
    this.profileObject = {};
    this.getProfileObject();
  }

  getProfileObject(){
    let username = 'ntbandara3';
    this.gitHubService.getProfileObject(username).subscribe(response => {
        console.log(response);
        this.profileObject = JSON.parse(response._body);
        console.log(this.profileObject);
    }, error => {
        console.error(error);
    })
  }

}
