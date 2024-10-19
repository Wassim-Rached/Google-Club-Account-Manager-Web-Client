import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthConfirmEmailVerificationComponent } from './auth-confirm-email-verification.component';

describe('AuthConfirmEmailVerificationComponent', () => {
  let component: AuthConfirmEmailVerificationComponent;
  let fixture: ComponentFixture<AuthConfirmEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthConfirmEmailVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthConfirmEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
