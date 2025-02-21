import { Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { WelcomeComponent } from './home/components/welcome/welcome.component';
import { FlowSequenceTimerComponent } from './home/components/flow-sequence-timer/flow-sequence-timer.component';
import { PrivacyPolicyComponent } from './shared/components/login-info-base/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './shared/components/login-info-base/terms-conditions/terms-conditions.component';
import { LoginInfoBaseComponent } from './shared/components/login-info-base/login-info-base.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: '',
    component: LoginInfoBaseComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'tos', component: TermsConditionsComponent },
    ],
  },

  { path: 'welcome', component: WelcomeComponent },
  { path: 'flowsequencetimer', component: FlowSequenceTimerComponent },
];
