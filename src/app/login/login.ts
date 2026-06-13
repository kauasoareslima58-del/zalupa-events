import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  perfilAtivo: string = 'aluno';

  constructor(private router: Router) {}

  mudarPerfil(perfil: string): void {
    this.perfilAtivo = perfil;
  }

  login(): void {
    this.router.navigate(['/home']);
  }
}