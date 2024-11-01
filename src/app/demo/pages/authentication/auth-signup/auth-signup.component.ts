import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export default class AuthSignupComponent implements OnInit {
  formGroup: FormGroup;
  redirect: string;
  isSubmitting = false;

  constructor(
    private router: Router,
    private accountService: AccountsService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue])
    });

    // get redirect URL from query parameters
    this.redirect = new URLSearchParams(window.location.search).get('redirect') || '/auth/signin';
  }

  onSignup() {
    if (!this.formGroup.valid || this.isSubmitting) return;

    if (this.formGroup.value.password !== this.formGroup.value.confirmPassword) {
      this.toastrService.error('Passwords do not match');
      return;
    }

    if (environment.requireStrongPassword) {
      const passwordStrengthError = AccountsService.validatePasswordStrength(this.formGroup.value.password);
      if (passwordStrengthError) {
        this.toastrService.error(passwordStrengthError);
        return;
      }
    }

    // remove the Terms and Conditions checkbox
    this.formGroup.removeControl('terms');

    // send the form data to the server
    this.isSubmitting = true;
    const payload = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password
    };
    this.accountService.createAccount(payload).subscribe({
      next: (_) => {
        this.isSubmitting = false;
        this.toastrService.success('Account created successfully');
        // check if the redirect url is outside the app
        if (/^(http|https):\/\//.test(this.redirect)) {
          window.location.href = this.redirect;
          return;
        }
        this.router.navigate([this.redirect]).then(() => {
          this.toastrService.info('Redirected to singin page');
        });
      },
      error: (error) => {
        this.isSubmitting = false;
        // check if error status is 409
        if (error.status === 409) {
          this.toastrService.error('Email already exists');
        } else {
          this.toastrService.error('An error occurred');
        }
      }
    });
  }

  get termsAndConditionsUrl() {
    return environment.termsAndConditionsUrl;
  }
}
