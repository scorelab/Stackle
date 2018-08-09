import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private profileObject;
  private loading = false;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileObject = {};
    this.getProfileObject();
    this.loading = true;
  }

  getProfileObject(){
    this.profileService.getProfileObject().subscribe(response => {
        this.profileObject = JSON.parse(response['_body']);
        this.loading = false;
    }, error => {
        console.error(error);
        this.loading = false;
    })
  }

}
