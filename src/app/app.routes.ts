import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Home } from './home/home';
import { Register } from './register/register';
import { Events } from './events/events';
import { About } from './about/about';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: Home },
  { path: "register", component: Register },
  { path: "events", component: Events },
  { path: "about", component: About },
  { path: "contact", component: Contact },
];