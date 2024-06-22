import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Comments, PeopleInfo, Posts } from '../../services/models/interface.model';
import { BehaviorSubject, Subscription, forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'body'];
  user: PeopleInfo | undefined;
  post: Posts | undefined;
  dataSourcePost = new MatTableDataSource<Posts>();
  dataSourceComments = new MatTableDataSource<Comments>();
  private postsSubject = new BehaviorSubject<Posts[]>([]);
  private routeSub: Subscription | undefined;
  posts$ = this.postsSubject.asObservable();

  message: string | undefined;
  messageType: 'success' | 'error' | undefined;

  @Output() postCreated = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.loadUserDetails(userId);
        this.loadPostsAndComments(userId);
      } else {
        this.showMessage('UserID is null', 'error');
      }
    });
  }

  loadUserDetails(userId: string): void {
    this.authService.getUserDetails(userId).subscribe(
      user => {
        this.user = user;
      },
      error => {
        this.showMessage('Error in request', 'error');
        console.error('Error in request', error);
      }
    );
  }

  loadPostsAndComments(userId: string): void {
    this.authService.getPostsDetails(userId).subscribe(posts => {
      const commentObservables = posts.map(post => this.authService.getComments(post.id));
      forkJoin(commentObservables).subscribe(commentLists => {
        posts.forEach((post, index) => post.comments = commentLists[index]);
        this.dataSourcePost.data = posts;
        this.postsSubject.next(posts);
      });
    });
  }

  deletePost(postId: number): void {
    this.authService.deletePost(postId).subscribe(
      () => {
        this.showMessage('Post deleted successfully', 'success');
        this.postCreated.emit();
        this.dataSourcePost.data = this.dataSourcePost.data.filter(post => post.id !== postId);
        this.postsSubject.next(this.dataSourcePost.data);
      },
      error => {
        this.showMessage('Error deleting post', 'error');
        console.error('Error deleting post:', error);
      }
    );
  }

  onCommentCreated(event: any, postId: number): void {
    const post = this.dataSourcePost.data.find(p => p.id === postId);
    if (post) {
      this.authService.getComments(post.id).subscribe(comments => {
        post.comments = comments;
      });
    }
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = undefined;
      this.messageType = undefined;
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
