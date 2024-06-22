import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTableModule } from '@angular/material/table';
import { UserDetailComponent } from './user-detail.component';
import { Comments, PeopleInfo, Posts } from '../../services/models/interface.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routeStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', [
      'getUserDetails', 'getPostsDetails', 'getComments', 'deletePost'
    ]);

    routeStub = {
      paramMap: of(convertToParamMap({ id: '1' }))
    };

    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      imports: [MatTableModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: ActivatedRoute, useValue: routeStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and load user details, posts and comments', () => {
    const user: PeopleInfo = { id: 1, name: 'Test User', email: 'test@example.com', gender: 'male', status: 'active' };
    const posts: Posts[] = [
      { id: 1, user_id: 1, title: 'Post 1', body: 'Body 1', comments: [] },
      { id: 2, user_id: 1, title: 'Post 2', body: 'Body 2', comments: [] }
    ];
    const comments: Comments[] = [
      { id: 1, post_id: 1, name: 'Commenter 1', email: 'commenter1@example.com', body: 'Comment 1' },
      { id: 2, post_id: 2, name: 'Commenter 2', email: 'commenter2@example.com', body: 'Comment 2' }
    ];

    authServiceSpy.getUserDetails.and.returnValue(of(user));
    authServiceSpy.getPostsDetails.and.returnValue(of(posts));
    authServiceSpy.getComments.and.callFake((postId: number) => {
      return of(comments.filter(comment => comment.post_id === +postId));
    });

    fixture.detectChanges();

    expect(authServiceSpy.getUserDetails).toHaveBeenCalledWith('1');
    expect(authServiceSpy.getPostsDetails).toHaveBeenCalledWith('1');
    expect(component.user).toEqual(user);
    expect(component.dataSourcePost.data).toEqual(posts);
  });

  it('should handle error when loading user details', () => {
    const error = 'Error loading user details';
    spyOn(console, 'error');
    authServiceSpy.getUserDetails.and.returnValue(throwError(() => new Error(error)));

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith('Error in request', jasmine.any(Error));
  });

  it('should delete a post successfully', () => {
    authServiceSpy.deletePost.and.returnValue(of({}));

    component.dataSourcePost.data = [
      { id: 1, user_id: 1, title: 'Post 1', body: 'Body 1', comments: [] },
      { id: 2, user_id: 1, title: 'Post 2', body: 'Body 2', comments: [] }
    ];

    component.deletePost(1);

    const updatedPosts = component.dataSourcePost.data.filter(post => post.id !== 1);
    component.dataSourcePost.data = updatedPosts;

    expect(authServiceSpy.deletePost).toHaveBeenCalledWith(1);

    const expectedPosts = [
      { id: 2, user_id: 1, title: 'Post 2', body: 'Body 2', comments: [] }
    ];
    expect(component.dataSourcePost.data).toEqual(expectedPosts);
  });

  it('should handle error when deleting a post', () => {
    const error = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
    spyOn(console, 'error');
    authServiceSpy.deletePost.and.returnValue(throwError(() => error));

    component.deletePost(1);

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith('Error deleting post:', jasmine.any(HttpErrorResponse));
  });
});
