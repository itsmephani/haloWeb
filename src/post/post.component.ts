import {APP_CONSTANTS} from '../constants/app-constants';
import {Http} from '@angular/http';
import {IPost} from '../models/ipost';
import {Component} from '@angular/core';
import {RestService} from '../services/rest-service';


@Component({
  selector: 'post',
  templateUrl: 'post.html',
  providers: [RestService]
})
export class Post {
  private loading: boolean = false;
  private post: IPost;
  public posts: Array<IPost>;
  public addNewPost: boolean = false;

  constructor(private http: Http, private restService: RestService) {
    this.http = http;
    this.initPost();
    this.restService.setUrl('posts');
    this.getPosts();
  }

  initPost() {
    this.post = {content: ''};
  }

  toggleAddNewPost() {
    this.addNewPost = !this.addNewPost;
    this.initPost();
  }

  getPosts() {
    this.loading = true;
    this.restService.all('posts', {}, {}).
      subscribe(response => {
        this.loading = false;
        this.posts = response.json()['data'];
      });
  }

  addPost() {
    this.restService.create('posts', {post: this.post}, {})
      .subscribe(response => {
        console.log(response);
        this.posts.push(response.json()['data']);
        this.initPost();
      });
  }

  like(post) {
    let like = {
      likeable_id: post.id,
      likeable_type: 'Post',
    }
    this.restService.create('likes', {like: like}, {})
      .subscribe(response => {
        post.likes.push(response.json()['data'])
      });

  }

  avatarUrl(post): string|null|undefined {
    let url = post.user.avatar.avatar.url;
    if (url && url.indexOf('http') == -1) {
      url = APP_CONSTANTS['HOST_URL'] + url;;
    }
    return url;
  }
}
