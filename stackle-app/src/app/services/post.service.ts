import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment} from '../../environments/environment';
import { Observable } from "../../../node_modules/rxjs";

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

  getAllPostsByOrg(orgName){
    return this.http.get(`${this.apiUrl}/api/post/all/org/${orgName}`, this.options)
      .catch((error: any)=> Observable.throw(error.json().error || 'Server error'));
  }

  getPost(id){
    return this.http.get(`${this.apiUrl}/api/post/${id}`, this.options);
  }

  createPost(postObject){
    return this.http.post(`${this.apiUrl}/api/post/create`, postObject);
  }

  voteUp(id,u_id) {
    return this.http.post(`${this.apiUrl}/api/post/likes/up/${id}`, {userId:u_id});
  }

  voteDown(id) {
    return this.http.post(`${this.apiUrl}/api/post/likes/down/${id}`, {userId:localStorage.getItem('username')});
  }

  //comments
  postComment(postId, commentObject) {
    return this.http.post(`${this.apiUrl}/api/comment/${postId}`, commentObject);
  }

  voteUpOnComment(commentId) {
    return this.http.post(`${this.apiUrl}/api/comment/likes/up/${commentId}`, {userId:localStorage.getItem('username')});
  }

  voteDownOnComment(commentId) {
    return this.http.post(`${this.apiUrl}/api/comment/likes/down/${commentId}`, {userId:localStorage.getItem('username')});
  }

  replyOnComment(commentId, replyObject) {
    return this.http.post(`${this.apiUrl}/api/reply/${commentId}`, replyObject);
  }
}
