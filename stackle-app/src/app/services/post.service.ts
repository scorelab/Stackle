import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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
    return this.http.get(`${this.apiUrl}/api/post/all`, this.options);
  }

  getPost(id){
    return this.http.get(`${this.apiUrl}/api/post/${id}`, this.options);
  }

  createPost(postObject){
    return this.http.post(`${this.apiUrl}/api/post/create`, postObject);
  }

  voteUp(id) {
    return this.http.post(`${this.apiUrl}/api/post/vote/up/${id}`, {});
  }

  voteDown(id) {
    return this.http.post(`${this.apiUrl}/api/post/vote/down/${id}`, {});
  }

  //comments
  postComment(postId, commentObject) {
    return this.http.post(`${this.apiUrl}/api/comment/${postId}`, commentObject);
  }

  voteUpOnComment(commentId) {
    return this.http.post(`${this.apiUrl}/api/comment/vote/up/${commentId}`, {});
  }

  voteDownOnComment(commentId) {
    return this.http.post(`${this.apiUrl}/api/comment/vote/down/${commentId}`, {});
  }
}
