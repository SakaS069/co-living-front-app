import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnnouncementDetailComponent } from './components/announcement-detail/announcement-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'annoucement/:id', component: AnnouncementDetailComponent },
  { path: '**', redirectTo: '' },

];
