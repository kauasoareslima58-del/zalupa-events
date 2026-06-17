import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface CalendarEvent {
  id: string;
  date: string;
  title: string;
}

interface WallNotice {
  id: string;
  text: string;
  role: 'professor' | 'responsavel';
  timestamp: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events implements OnInit {

  // Visualização inicial da tela (muda conforme o clique nas abas)
  userRole: 'professor' | 'responsavel' | 'aluno' = 'aluno';

  // Guarda quem está logado de verdade (Inicia vazio para não bloquear ninguém por engano)
  roleReal: string = '';

  calendarEvents: CalendarEvent[] = JSON.parse(
    localStorage.getItem('cal_events') || '[]'
  );

  wallNotices: WallNotice[] = JSON.parse(
    localStorage.getItem('wall_notices') || '[]'
  );

  constructor(private route: Router) {
    this.renderApplication();
  }

  ngOnInit(): void {
    // Resgata o perfil que veio lá da tela de login
    const usuarioSalvo = localStorage.getItem('roleLogado');
    
    if (usuarioSalvo) {
      this.roleReal = usuarioSalvo;
      this.userRole = usuarioSalvo as 'professor' | 'responsavel' | 'aluno'; 
    }
  }

  goToHome(){
    this.route.navigate(['/home'])
  }

  goToEvets(){
    this.route.navigate(['/events'])
  }

  goToAbout(){
    this.route.navigate(['/about'])
  }

  goToContact(){
    this.route.navigate(['/contact'])
  }
  
  exploreEvents() {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  }

  changeRole(role: 'professor' | 'responsavel' | 'aluno'): void {
    // 🔒 A TRAVA SÓ ENTRA EM AÇÃO SE O CARA FOR ALUNO DE VERDADE
    if (this.roleReal === 'aluno') {
      alert('Acesso negado: Alunos não podem alternar para a gestão de professores ou responsáveis!');
      return;
    }

    // Se NÃO for aluno (ou seja, for professor, responsável ou admin), ele troca de aba de boa
    this.userRole = role;
    this.renderApplication();
  }

  addEvent(date: string, title: string): void {
    // Bloqueia apenas se o cara for aluno de verdade tentando burlar
    if (this.roleReal === 'aluno') return;

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      date,
      title: title.trim()
    };

    this.calendarEvents.push(newEvent);
    this.saveState();
  }

  addNotice(text: string): void {
    // Bloqueia apenas se o cara for aluno de verdade tentando burlar
    if (this.roleReal === 'aluno') return;

    const now = new Date();

    const timeString =
      `${now.getDate().toString().padStart(2, '0')}/` +
      `${(now.getMonth() + 1).toString().padStart(2, '0')} às ` +
      `${now.getHours().toString().padStart(2, '0')}:` +
      `${now.getMinutes().toString().padStart(2, '0')}`;

    const newNotice: WallNotice = {
      id: crypto.randomUUID(),
      text: text.trim(),
      role: this.userRole as 'professor' | 'responsavel',
      timestamp: timeString
    };

    this.wallNotices.push(newNotice);
    this.saveState();
  }

  removeEvent(id: string): void {
    this.calendarEvents = this.calendarEvents.filter(
      event => event.id !== id
    );

    this.saveState();
  }

  removeNotice(id: string): void {
    this.wallNotices = this.wallNotices.filter(
      notice => notice.id !== id
    );

    this.saveState();
  }

  renderApplication(): void {
    this.renderCalendarGrid();
    this.renderWallNotices();
  }

  renderCalendarGrid(): void {
    const totalDays = 30;

    for (let day = 1; day <= totalDays; day++) {
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      const searchKey = `2026-06-${formattedDay}`;

      const events = this.calendarEvents.filter(
        event => event.date === searchKey
      );

      console.log(`Dia ${day}`, events);
    }
  }

  renderWallNotices(): void {
    console.log('Avisos:', this.wallNotices);
  }

  saveState(): void {
    localStorage.setItem(
      'cal_events',
      JSON.stringify(this.calendarEvents)
    );

    localStorage.setItem(
      'wall_notices',
      JSON.stringify(this.wallNotices)
    );

    this.renderApplication();
  }
}
