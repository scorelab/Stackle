import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UserService {

  private apiUrl = `${environment.API_URL}`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options;

  constructor(private http: Http) { }

  public getUser(id){
    return this.http.get(`${this.apiUrl}/api/user/${id}`, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error) || 'Server error');
  }

}
