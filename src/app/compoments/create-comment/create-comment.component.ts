import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Comments } from '../../services/models/interface.model';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {
  @Input() postId!: number;
  @Input() userEmail: string | undefined;
  @Input() userName: string | undefined;
  @Output() commentCreated = new EventEmitter<Comments>();
  commentForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.commentForm = this.fb.group({
      body: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const comment: Comments = {
        id: 0,
        post_id: this.postId,
        name: this.userName ?? '',
        email: this.userEmail ?? '',
        body: this.commentForm.get('body')?.value
      };

      this.authService.createComment(comment).subscribe(
        newComment => {
          this.message = 'Comment created successfully!';
          this.commentForm.reset();
          this.commentCreated.emit(newComment);
        },
        error => {
          this.message = 'Failed to create comment';
          console.error('Error creating comment:', error);
        }
      );
    }
  }
}
