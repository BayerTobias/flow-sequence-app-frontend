import { Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { WelcomeComponent } from './home/components/welcome/welcome.component';
import { FlowSequenceTimerComponent } from './home/components/flow-sequence-timer/flow-sequence-timer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'flowsequencetimer', component: FlowSequenceTimerComponent },
  { path: 'privacy-policy', component: WelcomeComponent },
  { path: 'imprint', component: WelcomeComponent },
];
