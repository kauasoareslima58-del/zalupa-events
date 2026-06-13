import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  constructor(private route: Router){}

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

  events = [
    { title: 'Conferência Tech 2026', date: '15 de Julho, 2026', description: 'O maior evento de tecnologia e inovação.' },
    { title: 'Festival de Inverno', date: '22 de Agosto, 2026', description: 'Música ao vivo, gastronomia e cultura.' },
    { title: 'Zalupa Hackathon', date: '05 de Setembro, 2026', description: '48 horas de pura programação e prêmios.' }
  ];

  exploreEvents() {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToAbout() {
    alert('Zalupa Events é a sua plataforma definitiva de gestão de eventos.');
  }

  registerEvent(eventTitle: string) {
    alert(`Inscrição iniciada para: ${eventTitle}`);
  }
}