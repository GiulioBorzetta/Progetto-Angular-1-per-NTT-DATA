import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PostsComponent } from './posts.component';
import { Posts, Comments } from '../../services/models/interface.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['getPosts', 'deletePost', 'getComments']);
    
    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        MatExpansionModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    authServiceSpy.getPosts.and.returnValue(of([]));
    authServiceSpy.deletePost.and.returnValue(of({}));
    authServiceSpy.getComments.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a default page size of 10', () => {
    expect(component.pageSize).toBe(10);
  });

  it('should load posts on initialization', () => {
    const posts: Posts[] = [
      { id: 1, user_id: 1, title: 'Post 1', body: 'Body 1', comments: [] },
      { id: 2, user_id: 1, title: 'Post 2', body: 'Body 2', comments: [] }
    ];
    authServiceSpy.getPosts.and.returnValue(of(posts));

    component.ngOnInit();

    expect(authServiceSpy.getPosts).toHaveBeenCalledWith({}, 10);
    expect(component.dataSource.data).toEqual(posts);
  });

  it('should handle error when loading posts', () => {
    const error = 'Error loading posts';
    spyOn(console, 'error');
    authServiceSpy.getPosts.and.returnValue(throwError(error));

    component.loadPosts();

    expect(console.error).toHaveBeenCalledWith('Error loading posts', error);
  });

  it('should apply filters and load filtered posts', () => {
    const filters = { title: 'Post 1' };
    const posts: Posts[] = [
      { id: 1, user_id: 1, title: 'Post 1', body: 'Body 1', comments: [] }
    ];
    authServiceSpy.getPosts.and.returnValue(of(posts));

    component.applyFilters(filters);

    expect(authServiceSpy.getPosts).toHaveBeenCalledWith(filters, 10);
    expect(component.dataSource.data).toEqual(posts);
  });

  it('should set page size and reload posts', () => {
    spyOn(component, 'loadPosts').and.callThrough();

    component.setPageSize(50);

    expect(component.pageSize).toBe(50);
    expect(component.loadPosts).toHaveBeenCalled();
  });

  it('should delete post successfully', () => {
    authServiceSpy.deletePost.and.returnValue(of({}));

    component.deletePost(1);

    expect(authServiceSpy.deletePost).toHaveBeenCalledWith(1);
  });

  it('should handle error when deleting post', () => {
    const error = 'Error deleting post';
    spyOn(console, 'error');
    authServiceSpy.deletePost.and.returnValue(throwError(error));

    component.deletePost(1);

    expect(authServiceSpy.deletePost).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith('Error deleting post', error);
  });

  it('should load comments for a post', () => {
    const comments: Comments[] = [
      { id: 1, post_id: 1, name: 'Commenter 1', email: 'commenter1@example.com', body: 'Comment 1' }
    ];
    authServiceSpy.getComments.and.returnValue(of(comments));

    component.loadComments(1);

    expect(authServiceSpy.getComments).toHaveBeenCalledWith(1);
    expect(component.comments[1]).toEqual(comments);
  });

  it('should handle error when loading comments', () => {
    const error = 'Error loading comments';
    spyOn(console, 'error');
    authServiceSpy.getComments.and.returnValue(throwError(error));

    component.loadComments(1);

    expect(authServiceSpy.getComments).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith('Error loading comments', error);
    expect(component.comments[1]).toEqual([]);
  });
});
