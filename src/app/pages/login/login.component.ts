import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  token: string = '';
  errorMessage: string | null = null;

  constructor(public authService: AuthService) { }

  login() {
    if (!this.token) {
      this.errorMessage = 'Token non impostato o non valido';
      return;
    }

    this.authService.setToken(this.token);

    this.authService.getUsers().subscribe(
      users => {
        this.errorMessage = null;
      },
      error => {
        this.errorMessage = 'Errore nella richiesta: ' + error.message;
      }
    );
  }
}
