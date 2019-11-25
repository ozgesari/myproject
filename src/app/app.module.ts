import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionService } from './service/transaction.service';
import { ClientComponent } from './client/client.component';
import { ClientService } from './service/client.service';
import { ReportService } from './service/report.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TransactionComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['https://sandbox-reporting.rpdpymnt.com'],
         blacklistedRoutes: ['https://sandbox-reporting.rpdpymnt.com/api/v3/merchant/user/login'],
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    TransactionService,
    ClientService,
    ReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
