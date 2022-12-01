import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { CreateUpdateEventComponent } from './pages/create-update-event/create-update-event.component';
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
  { path: 'dashboard', redirectTo: '/dashboard/eventos', pathMatch: 'full' },
  { path: 'manager', redirectTo: '/manager/criar-evento', pathMatch: 'full' },

  { path: 'eventos', title: 'QTáRolando?', component: EventsComponent },
  { path: 'eventos/:title/:id', title: 'QTáRolando?', component: EventDetailsComponent },

  { path: 'dashboard/eventos', title: 'QTáRolando? | Dashboard', component: DashboardEventsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/eventos/view', title: 'QTáRolando? | Todos Eventos', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/eventos/view/:title/:id', title: 'QTáRolando?', component: EventDetailsComponent, canActivate: [AuthGuard] },

  { path: 'dashboard/usuarios', title: 'QTáRolando? | Dashboard', component: DashboardUsersComponent, canActivate: [AuthGuard] },

  { path: 'manager/criar-evento', title: 'QTáRolando? | Criar Evento', component: CreateUpdateEventComponent, canActivate: [AuthGuard] },
  { path: 'manager/editar-evento', title: 'QTáRolando? | Criar Evento', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'manager/editar-evento/:title/:id', title: 'QTáRolando? | Editar Evento', component: CreateUpdateEventComponent, canActivate: [AuthGuard] },

  { path: 'manager/minha-conta', title: 'QTáRolando? | Minha Conta', component: AccountSettingsComponent, canActivate: [AuthGuard] },

  { path: 'login', title: 'Login | Cadastro', component: SigninSignupComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
