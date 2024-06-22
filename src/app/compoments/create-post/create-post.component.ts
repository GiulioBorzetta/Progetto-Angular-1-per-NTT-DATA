import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Posts } from '../../services/models/interface.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Input() userId: number | undefined;
  @Output() postCreated = new EventEmitter<void>();
  postForm: FormGroup;
  post: Posts = { id: 0, user_id: 0, title: '', body: '' };
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      user_id: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.userId !== undefined) {
      this.postForm.patchValue({ user_id: this.userId });
    }
  }

  createPost(): void {
    if (this.postForm.valid) {
      const newPost: Posts = {
        id: 0,
        user_id: this.postForm.get('user_id')?.value,
        title: this.postForm.get('title')?.value,
        body: this.postForm.get('body')?.value
      };
  
      this.authService.createPost(newPost).subscribe(
        () => {
          this.showMessage('Post created successfully', 'success');
          this.postForm.reset({ user_id: '', title: '', body: '' });
          this.postCreated.emit();
        },
        error => {
          console.error('Error creating post', error);
          this.showMessage('Failed to create post', 'error');
        }
      );
    } else {
      this.showMessage('Please fill out all required fields.', 'error');
    }
  }
  

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
