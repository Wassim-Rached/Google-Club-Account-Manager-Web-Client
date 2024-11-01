import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResendPasswordVerificationComponent } from './auth-resend-password-verification.component';

describe('AuthResendPasswordVerificationComponent', () => {
  let component: AuthResendPasswordVerificationComponent;
  let fixture: ComponentFixture<AuthResendPasswordVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResendPasswordVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthResendPasswordVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
