import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CreateUserComponent } from './create-user.component';
import { User } from '../../services/models/interface.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['createUser']);

    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with four controls', () => {
    expect(component.userForm.contains('name')).toBeTrue();
    expect(component.userForm.contains('email')).toBeTrue();
    expect(component.userForm.contains('gender')).toBeTrue();
    expect(component.userForm.contains('status')).toBeTrue();
  });

  it('should make the name control required', () => {
    const control = component.userForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('should make the email control required and validate email format', () => {
    const control = component.userForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalse();

    control?.setValue('notanemail');
    expect(control?.valid).toBeFalse();

    control?.setValue('test@example.com');
    expect(control?.valid).toBeTrue();
  });

  it('should make the gender control required', () => {
    const control = component.userForm.get('gender');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('should make the status control required', () => {
    const control = component.userForm.get('status');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('should show success message when user is created successfully', () => {
    const newUser: User = { id: 0, name: 'John Doe', email: 'john.doe@example.com', gender: 'male', status: 'active' };
    authServiceSpy.createUser.and.returnValue(of(newUser));

    component.userForm.patchValue(newUser);
    component.onSubmit();

    expect(authServiceSpy.createUser).toHaveBeenCalledWith(newUser);
    expect(component.message).toBe('User created successfully!');
    expect(component.messageType).toBe('success');
  });

  it('should show error message when user creation fails', () => {
    const error = 'Error creating user';
    authServiceSpy.createUser.and.returnValue(throwError(error));

    component.userForm.patchValue({ name: 'John Doe', email: 'john.doe@example.com', gender: 'male', status: 'active' });
    component.onSubmit();

    expect(authServiceSpy.createUser).toHaveBeenCalled();
    expect(component.message).toBe('Failed to create user');
    expect(component.messageType).toBe('error');
  });

  it('should reset form after successful user creation', () => {
    const newUser: User = { id: 0, name: 'John Doe', email: 'john.doe@example.com', gender: 'male', status: 'active' };
    authServiceSpy.createUser.and.returnValue(of(newUser));
  
    component.userForm.patchValue(newUser);
    component.onSubmit();
  
    expect(component.userForm.value).toEqual({ name: '', email: '', gender: 'male', status: 'active' });
  });
  

  it('should emit userCreated event after successful user creation', () => {
    spyOn(component.userCreated, 'emit');
    const newUser: User = { id: 0, name: 'John Doe', email: 'john.doe@example.com', gender: 'male', status: 'active' };
    authServiceSpy.createUser.and.returnValue(of(newUser));

    component.userForm.patchValue(newUser);
    component.onSubmit();

    expect(component.userCreated.emit).toHaveBeenCalled();
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
