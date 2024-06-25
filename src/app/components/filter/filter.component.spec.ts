import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.filterFields = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form fields based on input filterFields', () => {
    const matLabels = fixture.debugElement.queryAll(By.css('mat-label'));
    expect(matLabels.length).toBe(2);
    expect(matLabels[0].nativeElement.textContent).toBe('Name');
    expect(matLabels[1].nativeElement.textContent).toBe('Email');
  });

  it('should emit filterChange event with correct filters when form is submitted', () => {
    spyOn(component.filterChange, 'emit');

    component.filters = { name: 'John', email: 'john@example.com' };
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.filterChange.emit).toHaveBeenCalledWith({ name: 'John', email: 'john@example.com' });
  });

  it('should update filters when input values change', () => {
    const nameInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;

    nameInput.value = 'Jane';
    emailInput.value = 'jane@example.com';
    nameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));

    expect(component.filters['name']).toBe('Jane');
    expect(component.filters['email']).toBe('jane@example.com');
  });
});
