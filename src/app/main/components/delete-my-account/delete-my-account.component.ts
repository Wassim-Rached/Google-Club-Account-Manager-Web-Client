import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-delete-my-account',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './delete-my-account.component.html',
  styleUrl: './delete-my-account.component.scss'
})
export class DeleteMyAccountComponent {
  deletePassword: string = '';
  isSubmitting: boolean = false;

  constructor(
    private accountService: AccountsService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  deleteMyAccount() {
    if (this.isSubmitting || !this.deletePassword) return;

    this.isSubmitting = true;
    this.accountService.deleteMyAccount(this.deletePassword).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toastrService.success('Account deleted successfully');
        this.authService.logout();
      },
      error: (error) => {
        console.error(error);
        this.isSubmitting = false;
        const errorMessage = error.error || 'Account deletion failed';
        this.toastrService.error(errorMessage);
      }
    });
  }
}
