import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/models/interface.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  @Output() userCreated = new EventEmitter<void>();
  userForm: FormGroup;
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = {
        id: 0,
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        gender: this.userForm.get('gender')?.value,
        status: this.userForm.get('status')?.value
      };
  
      this.authService.createUser(user).subscribe(
        response => {
          this.showMessage('User created successfully!', 'success');
          this.userCreated.emit();
          this.userForm.reset({ name: '', email: '', gender: 'male', status: 'active' });
        },
        error => {
          this.showMessage('Failed to create user', 'error');
          console.error('Error creating user:', error);
        }
      );
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
