import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  token: string = '';


  constructor(public authService: AuthService) { }

  login() {
    if (!this.token) {
        console.error('Token non impostato o non valido');
        return;
    }

    this.authService.setToken(this.token);

    this.authService.getUsers().subscribe(
      users => {},
      error => {
        console.error('Errore nella richiesta', error);
        // Debug: Log dettagliato dell'errore
        console.error('Dettagli errore:', error.message);
      }
    );
}

}
