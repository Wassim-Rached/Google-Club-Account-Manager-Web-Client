import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsService } from './accounts.service';
import { AuthService } from './auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../AuthInterceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AccountsService, AuthService, provideHttpClient(withInterceptors([authInterceptor]))]
})
export class ServicesModule {}
