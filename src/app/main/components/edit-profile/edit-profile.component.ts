import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Account, AccountsService } from 'src/app/services/accounts.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  @Input({ required: true }) account: Account;
  formGroup: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private accountService: AccountsService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      photoUrl: new FormControl(this.account.photoUrl)
    });
  }

  resetToDefault() {
    this.formGroup.patchValue({
      photoUrl: this.account.photoUrl
    });
  }

  editProfile() {
    const photoUrl: string = this.formGroup.get('photoUrl').value;
    const payload = { photoUrl };

    this.isSubmitting = true;
    this.accountService.updateMyAccount(payload).subscribe({
      next: (account) => {
        this.account = account;
        this.isSubmitting = false;
        this.toastService.success('Profile updated successfully');
      },
      error: (error) => {
        console.error(error);
        this.isSubmitting = false;
        this.toastService.error('Failed to update profile');
      }
    });
  }
}
