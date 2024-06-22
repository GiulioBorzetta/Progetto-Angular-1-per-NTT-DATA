import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Todos } from '../../services/models/interface.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'user', 'title', 'date', 'time', 'status'];
  dataSource = new MatTableDataSource<Todos>();
  pageSize: number = 10;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.authService.getTodosDetails(this.pageSize).subscribe(
      (data: Todos[]) => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Error loading todos:', error);
      }
    );
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.loadTodos();
  }
}
