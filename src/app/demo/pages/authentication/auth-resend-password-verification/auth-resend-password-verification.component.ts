import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-auth-resend-password-verification',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './auth-resend-password-verification.component.html',
  styleUrl: './auth-resend-password-verification.component.scss'
})
export default class AuthResendPasswordVerificationComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitting = false;
  message: { type: 'S' | 'F'; value: string } | null = null;

  constructor(private accountService: AccountsService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit(): void {
    if (!this.formGroup.valid || this.isSubmitting) return;

    this.isSubmitting = true;

    const email = this.formGroup.value.email;
    this.accountService.requestResetPassword(email).subscribe({
      next: (_) => {
        this.isSubmitting = false;
        this.message = { type: 'S', value: 'Password verification token has been sent' };
      },
      error: (error) => {
        console.error(error);
        const message = error.error;
        this.message = { type: 'F', value: message || 'An error occurred' };
        this.isSubmitting = false;
      }
    });
  }
}
