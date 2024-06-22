import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { TodosComponent } from './todos.component';
import { Todos } from '../../services/models/interface.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['getTodosDetails']);
    
    await TestBed.configureTestingModule({
      declarations: [TodosComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a default page size of 10', () => {
    expect(component.pageSize).toBe(10);
  });

  it('should load todos on initialization', () => {
    const todos: Todos[] = [
      { id: 1, user_id: 1, title: 'Todo 1', due_on: new Date(), status: 'Pending' },
      { id: 2, user_id: 1, title: 'Todo 2', due_on: new Date(), status: 'Completed' }
    ];
    authServiceSpy.getTodosDetails.and.returnValue(of(todos));

    component.ngOnInit();

    expect(authServiceSpy.getTodosDetails).toHaveBeenCalledWith(10);
    expect(component.dataSource.data).toEqual(todos);
  });

  it('should handle error when loading todos', () => {
    const error = 'Error loading todos';
    spyOn(console, 'error');
    authServiceSpy.getTodosDetails.and.returnValue(throwError(() => new Error(error)));

    component.loadTodos();

    expect(console.error).toHaveBeenCalledWith('Error loading todos:', jasmine.any(Error));
  });

  it('should set page size and reload todos', () => {
    const todos: Todos[] = [
      { id: 1, user_id: 1, title: 'Todo 1', due_on: new Date(), status: 'Pending' },
      { id: 2, user_id: 1, title: 'Todo 2', due_on: new Date(), status: 'Completed' }
    ];
    authServiceSpy.getTodosDetails.and.returnValue(of(todos));

    spyOn(component, 'loadTodos').and.callThrough();

    component.setPageSize(20);

    expect(component.pageSize).toBe(20);
    expect(component.loadTodos).toHaveBeenCalled();
  });
});
