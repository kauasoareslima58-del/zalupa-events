import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  // Define o perfil inicial exigido pelo seu HTML
  perfilAtivo: string = 'aluno';

  // Executa a troca de abas ao clicar nos botões
  mudarPerfil(perfil: string): void {
    this.perfilAtivo = perfil;
  }
}
