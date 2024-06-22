import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['getUsers', 'deleteUser']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    authServiceSpy.getUsers.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on initialization', () => {
    const users = [
      { id: 1, name: 'User 1', email: 'user1@example.com', gender: 'male', status: 'active' },
      { id: 2, name: 'User 2', email: 'user2@example.com', gender: 'female', status: 'inactive' }
    ];
    authServiceSpy.getUsers.and.returnValue(of(users));

    component.ngOnInit();

    expect(authServiceSpy.getUsers).toHaveBeenCalledWith({}, 10);
    expect(component.dataSource.data).toEqual(users);
  });

  it('should handle error when loading users', () => {
    const error = new Error('Error loading users');
    spyOn(console, 'error');
    authServiceSpy.getUsers.and.returnValue(throwError(() => error));

    component.loadUsers();

    expect(console.error).toHaveBeenCalledWith('Error loading users', error);
    expect(component.message).toBe('Error loading users');
    expect(component.messageType).toBe('error');
  });

  it('should apply filters and load filtered users', () => {
    const filters = { name: 'User 1' };
    const users = [
      { id: 1, name: 'User 1', email: 'user1@example.com', gender: 'male', status: 'active' }
    ];
    authServiceSpy.getUsers.and.returnValue(of(users));

    component.applyFilters(filters);

    expect(authServiceSpy.getUsers).toHaveBeenCalledWith(filters, 10);
    expect(component.dataSource.data).toEqual(users);
  });

  it('should set page size and reload users', () => {
    spyOn(component, 'loadUsers').and.callThrough();

    component.setPageSize(50);

    expect(component.pageSize).toBe(50);
    expect(component.loadUsers).toHaveBeenCalled();
  });

  it('should delete user successfully', () => {
    const userId = 1;
    authServiceSpy.deleteUser.and.returnValue(of({}));

    component.delete(userId);

    expect(authServiceSpy.deleteUser).toHaveBeenCalledWith(userId);
    expect(authServiceSpy.getUsers).toHaveBeenCalled();
    expect(component.message).toBe('User deleted successfully');
    expect(component.messageType).toBe('success');
  });

  it('should handle error when deleting user', () => {
    const error = new Error('Error deleting user');
    spyOn(console, 'error');
    authServiceSpy.deleteUser.and.returnValue(throwError(() => error));

    component.delete(1);

    expect(authServiceSpy.deleteUser).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith('Error deleting user', error);
    expect(component.message).toBe('Error deleting user');
    expect(component.messageType).toBe('error');
  });

  it('should show success message', fakeAsync(() => {
    component.showMessage('Success', 'success');

    expect(component.message).toBe('Success');
    expect(component.messageType).toBe('success');

    tick(3000);
    expect(component.message).toBe('');
  }));

  it('should show error message', fakeAsync(() => {
    component.showMessage('Error', 'error');

    expect(component.message).toBe('Error');
    expect(component.messageType).toBe('error');

    tick(3000);
    expect(component.message).toBe('');
  }));
});
