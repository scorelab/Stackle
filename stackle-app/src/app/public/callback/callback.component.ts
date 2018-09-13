import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
              ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let userId = params['userId'];
      let token = params['token'];

      if(userId === "" || userId === undefined || token === "" || token === undefined){
        this.router.navigate(['login']);
        return;
      }

      localStorage.setItem('username', userId);
      localStorage.setItem('token', token);

      this.router.navigate(['app/commonFeed'])

    })
  }

}
