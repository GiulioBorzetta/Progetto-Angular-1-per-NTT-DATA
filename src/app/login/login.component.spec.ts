import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['setToken', 'getUsers', 'isAuthenticated']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setToken and getUsers on successful login', () => {
    const token = 'valid-token';
    component.token = token;
    authServiceSpy.getUsers.and.returnValue(of([]));

    component.login();

    expect(authServiceSpy.setToken).toHaveBeenCalledWith(token);
    expect(authServiceSpy.getUsers).toHaveBeenCalled();
  });

  it('should log error if token is not set', () => {
    spyOn(console, 'error');
    component.token = '';

    component.login();

    expect(console.error).toHaveBeenCalledWith('Token non impostato o non valido');
    expect(authServiceSpy.setToken).not.toHaveBeenCalled();
    expect(authServiceSpy.getUsers).not.toHaveBeenCalled();
  });

  it('should log error on failed getUsers call', () => {
    const error = { message: 'Errore di rete' };
    spyOn(console, 'error');
    component.token = 'valid-token';
    authServiceSpy.getUsers.and.returnValue(throwError(error));

    component.login();

    expect(authServiceSpy.setToken).toHaveBeenCalledWith('valid-token');
    expect(authServiceSpy.getUsers).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Errore nella richiesta', error);
    expect(console.error).toHaveBeenCalledWith('Dettagli errore:', error.message);
  });
});
