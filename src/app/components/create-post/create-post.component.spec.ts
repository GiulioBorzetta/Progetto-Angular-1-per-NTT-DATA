import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CreatePostComponent } from './create-post.component';
import { Posts } from '../../services/models/interface.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['createPost']);

    await TestBed.configureTestingModule({
      declarations: [CreatePostComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with user_id if provided', () => {
    component.userId = 1;
    component.ngOnInit();
    expect(component.postForm.get('user_id')?.value).toBe(1);
  });

  it('should not initialize form with user_id if not provided', () => {
    component.userId = undefined;
    component.ngOnInit();
    expect(component.postForm.get('user_id')?.value).toBe('');
  });

  it('should show success message when post is created successfully', () => {
    const newPost: Posts = { id: 0, user_id: 1, title: 'Test Title', body: 'Test Body' };
    authServiceSpy.createPost.and.returnValue(of(newPost));

    component.postForm.patchValue(newPost);
    component.createPost();

    expect(authServiceSpy.createPost).toHaveBeenCalledWith(newPost);
    expect(component.message).toBe('Post created successfully');
    expect(component.messageType).toBe('success');
  });

  it('should show error message when post creation fails', () => {
    const error = 'Error creating post';
    authServiceSpy.createPost.and.returnValue(throwError(error));

    component.postForm.patchValue({ user_id: 1, title: 'Test Title', body: 'Test Body' });
    component.createPost();

    expect(authServiceSpy.createPost).toHaveBeenCalled();
    expect(component.message).toBe('Failed to create post');
    expect(component.messageType).toBe('error');
  });

  it('should show error message when form is invalid', () => {
    component.createPost();
    expect(component.message).toBe('Please fill out all required fields.');
    expect(component.messageType).toBe('error');
  });

  it('should reset form after successful post creation', () => {
    const newPost: Posts = { id: 0, user_id: 1, title: 'Test Title', body: 'Test Body' };
    authServiceSpy.createPost.and.returnValue(of(newPost));

    component.postForm.patchValue(newPost);
    component.createPost();

    expect(component.postForm.value).toEqual({ user_id: '', title: '', body: '' });
  });

  it('should reset form after successful post creation', () => {
    const newPost: Posts = { id: 0, user_id: 1, title: 'Test Title', body: 'Test Body' };
    authServiceSpy.createPost.and.returnValue(of(newPost));
  
    component.postForm.patchValue(newPost);
    component.createPost();
  
    expect(component.postForm.value).toEqual({ user_id: '', title: '', body: '' });
  });
  


  it('should call showMessage and clear message after timeout', (done) => {
    component['showMessage']('Test Message', 'success');
    expect(component.message).toBe('Test Message');
    expect(component.messageType).toBe('success');
    
    setTimeout(() => {
      expect(component.message).toBe('');
      done();
    }, 3000);
  });
});
