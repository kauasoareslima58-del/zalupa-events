import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  perfilAtivo: 'aluno' | 'outro' = 'aluno';

  constructor() { }

  mudarPerfil(perfil: 'aluno' | 'outro'): void {
    this.perfilAtivo = perfil;
  }
}
