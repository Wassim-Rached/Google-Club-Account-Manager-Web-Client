// angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/services/accounts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  account: Account;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.currentAccount$.subscribe((account) => {
      this.account = account;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/signin']).then(() => {
      this.toastrService.info('Redirected to singin page');
    });
  }
}
