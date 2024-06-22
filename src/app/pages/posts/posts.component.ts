import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Posts, Comments } from '../../services/models/interface.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'user_id', 'title', 'body', 'delete'];
  dataSource = new MatTableDataSource<Posts>();
  pageSize: number = 10;
  filters: any = {};
  comments: { [key: number]: Comments[] } = {};
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  filterFields = [
    { key: 'user_id', label: 'User ID' },
    { key: 'title', label: 'Title' },
    { key: 'body', label: 'Body' }
  ];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(filters: any = this.filters): void {
    this.authService.getPosts(filters, this.pageSize).subscribe(
      (data: Posts[]) => {
        this.dataSource.data = data;
      },
      error => {
        this.showMessage('Error loading posts', 'error');
        console.error('Error loading posts', error);
      }
    );
  }

  applyFilters(filters: any): void {
    this.filters = filters;
    this.loadPosts(filters);
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.loadPosts();
  }

  deletePost(postId: number): void {
    this.authService.deletePost(postId).subscribe(
      () => {
        this.showMessage('Post deleted successfully', 'success');
        this.loadPosts();
      },
      error => {
        this.showMessage('Error deleting post', 'error');
        console.error('Error deleting post', error);
      }
    );
  }

  loadComments(postId: number): void {
    if (!this.comments[postId]) {
      this.authService.getComments(postId).subscribe(
        (data: Comments[]) => {
          this.comments[postId] = data;
        },
        error => {
          this.showMessage('Error loading comments', 'error');
          console.error('Error loading comments', error);
          this.comments[postId] = [];
        }
      );
    }
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 3000);
  }
}
