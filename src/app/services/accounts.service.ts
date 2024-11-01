import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Account {
  id: string;
  email: string;
  photoUrl: string;
  roles?: Role[];
  permissions?: Permission[];
  isEmailVerified: boolean;
  isLocked: boolean;
  isMember: boolean;
  isIdentityVerified: boolean;
  createdAt: string;
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

  // email verification related
  verifyEmail(token: string): Observable<string> {
    return this.http
      .get<string>(`${environment.ics}/api/accounts/verify-email?token=${token}`, { responseType: 'text' as 'json' })
      .pipe(map((response) => response as string));
  }

  resendEmailVerificationToken(email: string): Observable<string> {
    return this.http.post<string>(`${environment.ics}/api/accounts/verify-email/resend?email=${email}`, null, {
      responseType: 'text' as 'json'
    });
  }

  // password reset related
  requestResetPassword(email: string): Observable<string> {
    return this.http.post<string>(`${environment.ics}/api/accounts/reset-password/resend`, null, {
      params: { email },
      responseType: 'text' as 'json'
    });
  }

  isResetPasswordTokenValid(token: string): Observable<string> {
    return this.http.get<string>(`${environment.ics}/api/accounts/reset-password`, {
      params: { token },
      responseType: 'text' as 'json'
    });
  }

  consumeResetPassword(token: string, newPassword: string): Observable<string> {
    return this.http.post<string>(
      `${environment.ics}/api/accounts/reset-password`,
      {
        token,
        newPassword
      },
      { responseType: 'text' as 'json' }
    );
  }

  // requestResetPassword(email: string): Observable<string> {
  //   return this.http.post<string>(`${environment.ics}/api/accounts/reset-password/request`, null, {
  //     params: { email },
  //     responseType: 'text' as 'json'
  //   });
  // }

  // confirmResetPassword(token: string, newPassword: string): Observable<string> {
  //   return this.http.post<string>(
  //     `${environment.ics}/api/accounts/reset-password/confirm`,
  //     {
  //       token,
  //       newPassword
  //     },
  //     { responseType: 'text' as 'json' }
  //   );
  // }

  // my account related
  getMyAccount(isDetailed: boolean = false): Observable<Account> {
    return this.http.get<Account>(`${environment.ics}/api/accounts/me?isDetailed=${isDetailed}`).pipe(
      map((account) => {
        if (!account.photoUrl) {
          account.photoUrl = environment.defaultPhotoUrl;
        }
        return account;
      })
    );
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

  deleteMyAccount(password: string): Observable<string> {
    return this.http
      .delete(`${environment.ics}/api/accounts/me`, {
        params: { password },
        responseType: 'text'
      })
      .pipe(map((response) => response as unknown as string));
  }

  // validation related
  public static validatePasswordStrength(password): string {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one digit';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
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
