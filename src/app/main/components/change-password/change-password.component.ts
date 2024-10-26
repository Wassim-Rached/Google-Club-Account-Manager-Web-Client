import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitting = false;

  constructor(
    private accountService: AccountsService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('newPassword')])
    });
  }

  matchValues(matchTo: string): (control: FormControl) => { [key: string]: boolean } | null {
    return (control: FormControl) => {
      return control?.parent?.controls[matchTo].value === control.value ? null : { isMatching: false };
    };
  }

  changePassword() {
    if (!this.formGroup.valid || this.isSubmitting) return;

    const oldPassword: string = this.formGroup.get('oldPassword').value;
    const newPassword: string = this.formGroup.get('newPassword').value;

    const passwordStrengthError = AccountsService.validatePasswordStrength(newPassword);
    if (passwordStrengthError) {
      this.toastrService.error(passwordStrengthError);
      return;
    }

    const payload = { oldPassword, newPassword };

    this.isSubmitting = true;
    this.accountService.changePassword(payload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.formGroup.reset();
        this.toastrService.success('Password changed successfully');
      },
      error: (error) => {
        this.isSubmitting = false;
        this.toastrService.error(error.error || 'Error changing password');
      }
    });
  }
}
