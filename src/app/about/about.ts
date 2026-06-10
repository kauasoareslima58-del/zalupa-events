import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
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
  exploreEvents() {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  }
}


