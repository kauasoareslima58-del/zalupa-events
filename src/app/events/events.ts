import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

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

}@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule
  ],
  templateUrl: './events.html',
  styleUrls: ['./events.css']
})

export class Events implements OnInit {

  // Visualização inicial da tela (muda conforme o clique nas abas)
  userRole: 'professor' | 'responsavel' | 'aluno' = 'aluno';

  // Guarda quem está logado de verdade
  roleReal: string = '';

  // Eventos salvos
  calendarEvents: CalendarEvent[] = JSON.parse(
    localStorage.getItem('cal_events') || '[]'
  );

  // Avisos do mural
  wallNotices: WallNotice[] = JSON.parse(
    localStorage.getItem('wall_notices') || '[]'
  );

  // Configuração do FullCalendar
calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [
    dayGridPlugin,
    interactionPlugin
  ],
  locale: ptBrLocale,
  editable: true,
  selectable: true,
  height: 'auto',
  events: []
};
  constructor(private route: Router) {
    this.renderApplication();
  }

  ngOnInit(): void {

    // Resgata o perfil que veio da tela de login
    const usuarioSalvo = localStorage.getItem('roleLogado');

    if (usuarioSalvo) {
      this.roleReal = usuarioSalvo;
      this.userRole = usuarioSalvo as 'professor' | 'responsavel' | 'aluno';
    }

    this.loadEventsIntoCalendar();
  }

  // ==========================
  // NAVEGAÇÃO
  // ==========================

  goToHome() {
    this.route.navigate(['/home']);
  }

  goToEvets() {
    this.route.navigate(['/events']);
  }

  goToAbout() {
    this.route.navigate(['/about']);
  }

  goToContact() {
    this.route.navigate(['/contact']);
  }

  exploreEvents() {
    document.getElementById('events')?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  // ==========================
  // CONTROLE DE PERFIL
  // ==========================

  changeRole(role: 'professor' | 'responsavel' | 'aluno'): void {

    if (this.roleReal === 'aluno') {
      alert(
        'Acesso negado: Alunos não podem alternar para a gestão de professores ou responsáveis!'
      );
      return;
    }

    this.userRole = role;
    this.renderApplication();
  }

  // ==========================
  // CALENDÁRIO
  // ==========================

  addEvent(date: string, title: string): void {

    if (this.roleReal === 'aluno') {
      alert('Alunos não podem criar eventos.');
      return;
    }

    if (!date || !title.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      date,
      title: title.trim()
    };

    this.calendarEvents.push(newEvent);

    console.log('Evento adicionado:', newEvent);

    this.saveState();

    this.loadEventsIntoCalendar();

    alert('Evento publicado com sucesso!');
  }

  removeEvent(id: string): void {

    const confirmar = confirm(
      'Deseja realmente excluir este evento?'
    );
  
    if (!confirmar) {
      return;
    }
  
    this.calendarEvents = this.calendarEvents.filter(
      event => event.id !== id
    );
  
    this.saveState();
  
    this.loadEventsIntoCalendar();
  }

  loadEventsIntoCalendar(): void {

    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.calendarEvents.map(event => ({
        id: event.id,
        title: event.title,
        start: event.date
      }))
    };
  }

  // ==========================
  // MURAL DE AVISOS
  // ==========================

  addNotice(text: string): void {

    if (this.roleReal === 'aluno') return;

    if (!text.trim()) return;

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

  removeNotice(id: string): void {

    this.wallNotices = this.wallNotices.filter(
      notice => notice.id !== id
    );

    this.saveState();
  }

  // ==========================
  // RENDERIZAÇÃO
  // ==========================

  renderApplication(): void {
    this.renderCalendarGrid();
    this.renderWallNotices();
  }

  renderCalendarGrid(): void {

    const totalDays = 30;

    for (let day = 1; day <= totalDays; day++) {

      const formattedDay =
        day < 10
          ? `0${day}`
          : `${day}`;

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

  // ==========================
  // LOCAL STORAGE
  // ==========================

  saveState(): void {

    localStorage.setItem(
      'cal_events',
      JSON.stringify(this.calendarEvents)
    );

    localStorage.setItem(
      'wall_notices',
      JSON.stringify(this.wallNotices)
    );

    this.loadEventsIntoCalendar();

    this.renderApplication();
  }
}