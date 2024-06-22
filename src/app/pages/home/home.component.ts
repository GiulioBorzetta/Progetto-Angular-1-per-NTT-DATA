import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status', 'link', 'delete'];
  dataSource = new MatTableDataSource<any>();
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  pageSize: number = 10;
  filters: any = {};

  filterFields = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'gender', label: 'Gender' },
    { key: 'status', label: 'Status' }
  ];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }


  applyFilters(filters: any): void {
    this.filters = filters;
    this.loadUsers(filters);
  }

  loadUsers(filters: any = {}): void {
    this.authService.getUsers(filters, this.pageSize).subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.error('Error loading users', error);
      this.showMessage('Error loading users', 'error');
    });
  }

  delete(userId: number): void {
    this.authService.deleteUser(userId).subscribe(() => {
      this.showMessage('User deleted successfully', 'success');
      this.loadUsers();
    }, error => {
      console.error('Error deleting user', error);
      this.showMessage('Error deleting user', 'error');
    });
  }


  setPageSize(size: number) {
    this.pageSize = size;
    this.loadUsers();
  }

  public showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }  
}
