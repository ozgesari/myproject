import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { TransactionComponent } from './transaction/transaction.component';
import { ClientComponent } from './client/client.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'transaction', component: TransactionComponent},
  { path: 'transaction/:id', component: TransactionComponent},
  { path: 'client/:id', component: ClientComponent},
  { path: 'report', component: ReportComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
