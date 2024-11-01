import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-reset-password',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export default class AuthResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitting = false;
  message: { type: 'S' | 'F'; value: string } | null;
  email: string | null = undefined;
  token: string | null = undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountsService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  matchValues(matchTo: string): (control: FormControl) => { [key: string]: boolean } | null {
    return (control: FormControl) => {
      return control?.parent?.controls[matchTo].value === control.value ? null : { isMatching: false };
    };
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required, this.matchValues('newPassword')]]
    });

    this.token = this.route.snapshot.queryParams['token'];
    this.accountService.isResetPasswordTokenValid(this.token).subscribe({
      next: (email) => {
        this.email = email;
      },
      error: (error) => {
        console.error(error);
        this.email = null;
      }
    });
  }

  onSubmit() {
    if (!this.formGroup.valid) return;

    const newPassword = this.formGroup.value.newPassword;

    if (environment.requireStrongPassword) {
      const passwordStrengthError = AccountsService.validatePasswordStrength(newPassword);
      if (passwordStrengthError) {
        this.toastrService.error(passwordStrengthError);
        return;
      }
    }

    this.isSubmitting = true;
    this.accountService.consumeResetPassword(this.token, newPassword).subscribe({
      next: (message) => {
        this.isSubmitting = false;
        this.message = { type: 'S', value: message };
        this.toastrService.success('Password reset successfully');
        setTimeout(() => {
          this.router.navigate(['/auth/login']).then(() => {
            this.toastrService.info('redirected to signin page');
          });
        }, 3000);
      },
      error: (error) => {
        console.error(error);
        this.isSubmitting = false;
        this.message = { type: 'F', value: error };
      }
    });
  }
}
