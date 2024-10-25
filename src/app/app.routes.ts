import { Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'privacy-policy', component: HomeComponent },
  { path: 'imprint', component: HomeComponent },
];
