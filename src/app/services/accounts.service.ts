import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Account {
  id: string;
  email: string;
  photoUrl: string;
  isEmailVerified: boolean;
  isMember: boolean;
  createdAt: string; // ISO 8601 date string
  permissions: Permission[];
  roles: Role[];
}

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient) {}

  createAccount({ email, password }: { email: string; password: string }): Observable<string> {
    return this.http.post<string>(
      `${environment.ics}/api/accounts`,
      {
        email,
        password
      },
      { responseType: 'text' as 'json' }
    );
  }

  getMyAccount(isDetailed: boolean = false): Observable<Account> {
    return this.http.get<Account>(`${environment.ics}/api/accounts/me?isDetailed=${isDetailed}`);
  }

  verifyEmail(token: string): Observable<string> {
    return this.http.get<string>(`${environment.ics}/api/accounts/verify-email?token=${token}`, { responseType: 'text' as 'json' });
  }

  resendEmailVerificationToken(email: string): Observable<string> {
    return this.http.post<string>(`${environment.ics}/api/accounts/verify-email/resend?email=${email}`, null);
  }

  requestResetPassword(email: string): Observable<string> {
    return this.http.post<string>(`${environment.ics}/api/accounts/reset-password/request`, null, {
      params: { email }
    });
  }

  confirmResetPassword(token: string, newPassword: string): Observable<string> {
    return this.http.post<string>(`${environment.ics}/api/accounts/reset-password/confirm`, {
      token,
      newPassword
    });
  }

  changePassword({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }): Observable<string> {
    return this.http.post<string>(
      `${environment.ics}/api/accounts/change-password`,
      {
        oldPassword,
        newPassword
      },
      { responseType: 'text' as 'json' }
    );
  }

  updateMyAccount({ photoUrl }: { photoUrl: string }): Observable<Account> {
    return this.http.put<Account>(`${environment.ics}/api/accounts/me`, {
      photoUrl
    });
  }
}

export interface EmailVerificationToken {
  id: string;
  token: string;
  expiryDate: string; // ISO 8601 date string
  createdDate: string; // ISO 8601 date string
  isUsed: boolean;
  account: Account;
}

export interface Role {
  id: string;
  name: string;
  scope: string;
  description?: string;
  permissions?: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  scope: string;
  description?: string;
}
