import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CreateCommentComponent } from './create-comment.component';
import { Comments } from '../../services/models/interface.model';

describe('CreateCommentComponent', () => {
  let component: CreateCommentComponent;
  let fixture: ComponentFixture<CreateCommentComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['createComment']);

    await TestBed.configureTestingModule({
      declarations: [CreateCommentComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCommentComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    component.postId = 1;
    component.userEmail = 'test@example.com';
    component.userName = 'Test User';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a success message and emit an event when the comment is created successfully', () => {
    const newComment: Comments = { id: 1, post_id: 1, name: 'Test User', email: 'test@example.com', body: 'Test comment' };
    authServiceSpy.createComment.and.returnValue(of(newComment));
    spyOn(component.commentCreated, 'emit');

    component.commentForm.setValue({ body: 'Test comment' });
    expect(component.commentForm.valid).toBe(true);
    component.onSubmit();

    expect(authServiceSpy.createComment).toHaveBeenCalledWith(jasmine.objectContaining({
      post_id: 1,
      name: 'Test User',
      email: 'test@example.com',
      body: 'Test comment'
    }));
    expect(component.message).toBe('Comment created successfully!');
    expect(component.commentCreated.emit).toHaveBeenCalledWith(newComment);
  });

  it('should display an error message when the comment creation fails', () => {
    const error = 'Error creating comment';
    spyOn(console, 'error');
    authServiceSpy.createComment.and.returnValue(throwError(() => error));

    component.commentForm.setValue({ body: 'Test comment' });
    component.onSubmit();

    expect(authServiceSpy.createComment).toHaveBeenCalledWith(jasmine.objectContaining({
      post_id: 1,
      name: 'Test User',
      email: 'test@example.com',
      body: 'Test comment'
    }));
    expect(component.message).toBe('Failed to create comment');
    expect(console.error).toHaveBeenCalledWith('Error creating comment:', error);
  });

  it('should not submit the form if it is invalid', () => {
    spyOn(component.commentCreated, 'emit');

    component.commentForm.setValue({ body: '' });
    expect(component.commentForm.valid).toBe(false);
    component.onSubmit();

    expect(authServiceSpy.createComment).not.toHaveBeenCalled();
    expect(component.commentCreated.emit).not.toHaveBeenCalled();
  });
});
