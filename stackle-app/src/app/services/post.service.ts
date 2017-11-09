import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment} from '../../environments/environment';

@Injectable()
export class PostService {

  private apiUrl = `${environment.API_URL}`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options;

  constructor(
    private http: Http
  ) { }

  getAllPosts(params?){
    return this.http.get(`${this.apiUrl}/api/posts`, this.options);
  }
}
