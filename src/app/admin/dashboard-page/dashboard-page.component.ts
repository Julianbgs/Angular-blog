import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Subscription} from 'rxjs';
import {Post} from '../shared/components/inrefaces';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  unSub: Subscription;
  searchModel = '';

  constructor(private postService: PostsService, private alert: AlertService) { }

  ngOnInit() {
   this.unSub =  this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.danger('Post deleted');
    });
  }
}
