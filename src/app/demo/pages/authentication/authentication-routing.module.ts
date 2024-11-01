import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        loadComponent: () => import('./auth-signin/auth-signin.component')
      },
      {
        path: 'signup',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'email-verification/resend',
        loadComponent: () => import('./auth-resend-email-verification/auth-resend-email-verification.component')
      },
      {
        path: 'email-verification/confirm',
        loadComponent: () => import('./auth-confirm-email-verification/auth-confirm-email-verification.component')
      },
      {
        path: 'reset-password/resend',
        loadComponent: () => import('./auth-resend-password-verification/auth-resend-password-verification.component')
      },
      {
        path: 'reset-password/confirm',
        loadComponent: () => import('./auth-reset-password/auth-reset-password.component')
      },
      {
        path: '**',
        redirectTo: 'signin'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
