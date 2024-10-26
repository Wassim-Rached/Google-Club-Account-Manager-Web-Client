import { Component, OnInit } from '@angular/core';
import { Account, AccountsService, Permission, Role } from 'src/app/services/accounts.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ChangePasswordComponent } from '../../../components/change-password/change-password.component';
import { EditProfileComponent } from '../../../components/edit-profile/edit-profile.component';
import { Authorities, AuthoritiesDiagramComponent } from '../../../components/authorities-diagram/authorities-diagram.component';
import { DeleteMyAccountComponent } from '../../../components/delete-my-account/delete-my-account.component';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [SharedModule, ChangePasswordComponent, EditProfileComponent, AuthoritiesDiagramComponent, DeleteMyAccountComponent],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.scss'
})
export class ProfileOverviewComponent implements OnInit {
  account?: Account;

  constructor(private accountService: AccountsService) {}

  ngOnInit() {
    this.refreshAccount();
  }

  refreshAccount() {
    this.account = undefined;
    this.accountService.getMyAccount(true).subscribe({
      next: (account) => {
        this.account = account;
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

  get diagramAuthorities(): Authorities {
    const roles = this.account.roles.map((r): Authorities['roles'][0] => {
      return {
        name: r.name,
        scope: r.scope,
        permissions: r.permissions.map((p): Authorities['roles'][0]['permissions'][0] => {
          return {
            name: p.name,
            scope: p.scope
          };
        })
      };
    });
    const permissions = this.account.permissions.map((p): Authorities['permissions'][0] => {
      return {
        name: p.name,
        scope: p.scope
      };
    });
    return {
      email: this.account.email,
      roles: roles,
      permissions: permissions
    };
  }
}
