import { Component, OnInit } from '@angular/core';
import { Account, AccountsService, Permission, Role } from 'src/app/services/accounts.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ChangePasswordComponent } from '../../../components/change-password/change-password.component';
import { EditProfileComponent } from '../../../components/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [SharedModule, ChangePasswordComponent, EditProfileComponent],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.scss'
})
export class ProfileOverviewComponent implements OnInit {
  account?: Account;
  defaultAvatar = environment.defaultPhotoUrl;

  constructor(private accountService: AccountsService) {}

  ngOnInit() {
    this.accountService.getMyAccount(true).subscribe({
      next: (account) => {
        this.account = account;
        if (!account.photoUrl) {
          this.account.photoUrl = this.defaultAvatar;
        }
        this.account.isMember = true;
      },
      error: (error) => {
        this.account = null;
        console.error('Error fetching account', error);
      }
    });
  }

  get authorities(): Set<string> {
    const permissions = this.account?.permissions.map((permission) => permission.scope + '.perm.' + permission.name) || [];
    const roles =
      this.account?.roles.map((role) => {
        if (role.permissions) {
          permissions.concat(role.permissions.map((permission) => permission.scope + '.perm.' + permission.name));
        }
        return role.scope + '.role.' + role.name;
      }) || [];
    return new Set(permissions.concat(roles));
  }
}

function getRolePublicName(role: Role): string {
  return role.scope + '.role.' + role.name;
}

function getPermissionPublicName(permission: Permission): string {
  return permission.scope + '.perm.' + permission.name;
}
