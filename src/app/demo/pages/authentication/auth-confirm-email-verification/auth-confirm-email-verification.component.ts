import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-auth-confirm-email-verification',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './auth-confirm-email-verification.component.html',
  styleUrl: './auth-confirm-email-verification.component.scss'
})
export default class AuthConfirmEmailVerificationComponent implements OnInit {
  token: string;
  isVerifying = false;
  verificationStatus: 'not_found' | 'success';

  constructor(
    private route: ActivatedRoute,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.confirmEmail();
  }

  confirmEmail(): void {
    const token = this.token;
    if (!token || this.isVerifying) return;

    this.isVerifying = true;
    this.accountsService.verifyEmail(token).subscribe({
      next: (_) => {
        this.isVerifying = false;
        this.verificationStatus = 'success';
      },
      error: (error) => {
        console.error(error);
        this.isVerifying = false;
        this.verificationStatus = 'not_found';
      }
    });
  }
}
