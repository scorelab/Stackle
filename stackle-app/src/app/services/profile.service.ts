import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class ProfileService {

  private gitHubApiUrl = 'https://api.github.com';
  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: Http
  ) { }

  public getCurrentUser(){
    var username = localStorage.getItem('username');
    return this.http.get(`${this.gitHubApiUrl}/users/${username}`);
  }

  public getCurrentUserFromDB() {
    var username = localStorage.getItem('username');
    return this.http.get(`${this.apiUrl}/api/user/${username}`);
  }

  public getProfileByUserName(username) {
    return this.http.get(`${this.gitHubApiUrl}/users/${username}`);
  }

  public getProfileByUserNameFromDB(username){
    return this.http.get(`${this.apiUrl}/api/user/${username}`);
  }

}
