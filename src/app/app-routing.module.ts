import { AuthGuard } from './helpers/auth.guard';
import { SigninSignupComponent } from './pages/signin-signup/signin-signup.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardEventsComponent } from './pages/dashboard-events/dashboard-events.component';
import { DashboardUsersComponent } from './pages/dashboard-users/dashboard-users.component';
import { EventsComponent } from './pages/events/events.component';

const routes: Routes = [
  { path: '', redirectTo: '/eventos', pathMatch: 'full' },
  { path: 'eventos', title: 'QTáRolando?', component: EventsComponent },
  { path: 'evento/:id', title: 'QTáRolando?', component: EventDetailsComponent },
  { path: 'dashboard/eventos', title: 'QTáRolando?', component: DashboardEventsComponent },
  { path: 'dashboard/usuarios', title: 'QTáRolando?', component: DashboardUsersComponent },
  { path: 'login', title: 'Login | Cadastro', component: SigninSignupComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
