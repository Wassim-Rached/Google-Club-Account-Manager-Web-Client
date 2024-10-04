import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

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
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue])
    });

    // get redirect URL from query parameters
    this.redirect = new URLSearchParams(window.location.search).get('redirect') || '/auth/signin';
  }

  onSignup() {
    if (!this.formGroup.valid || this.isSubmitting) return;

    // remove the Terms and Conditions checkbox
    this.formGroup.removeControl('terms');

    // send the form data to the server
    this.isSubmitting = true;
    this.http.post('https://ics-server.azurewebsites.net/api/accounts', this.formGroup.value).subscribe({
      next: (data) => {
        this.isSubmitting = false;
        // check if the redirect url is outside the app
        if (/^(http|https):\/\//.test(this.redirect)) {
          window.location.href = this.redirect;
          return;
        }
        this.router.navigate([this.redirect]);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.log(error);
      }
    });
  }
}
