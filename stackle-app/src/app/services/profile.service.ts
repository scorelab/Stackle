import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class ProfileService {

  private apiUrl = 'https://api.github.com';

  constructor(
    private http: Http
  ) { }

  public getProfileObject(){
    var username = localStorage.getItem('username');
    return this.http.get(`${this.apiUrl}/users/${username}`);
  }

}
