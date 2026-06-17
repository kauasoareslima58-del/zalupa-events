import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Adicionado para suportar o *ngIf no HTML standalone

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  perfilAtivo: string = 'aluno';
  subPerfilSelecionado: 'professor' | 'responsavel' = 'professor'; // Valor padrão inicial do select

  constructor(private router: Router) {}

  mudarPerfil(perfil: string): void {
    this.perfilAtivo = perfil;
  }

  login(): void {
    let roleDefinitiva = 'aluno';

    if (this.perfilAtivo === 'outro') {
      // Se escolheu a aba "outro", pega exatamente o valor que está na setinha (select)
      roleDefinitiva = this.subPerfilSelecionado;
    }

    // Salva a role correta no navegador
    localStorage.setItem('roleLogado', roleDefinitiva);

    // Navega para a página inicial/eventos
    this.router.navigate(['/events']); // Certifique-se de usar a sua rota padrão aqui
  }
}
