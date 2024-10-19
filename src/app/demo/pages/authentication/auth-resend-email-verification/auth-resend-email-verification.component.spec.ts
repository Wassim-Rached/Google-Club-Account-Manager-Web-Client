import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResendEmailVerificationComponent } from './auth-resend-email-verification.component';

describe('AuthResendEmailVerificationComponent', () => {
  let component: AuthResendEmailVerificationComponent;
  let fixture: ComponentFixture<AuthResendEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResendEmailVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthResendEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
