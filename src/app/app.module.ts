import { httpInterceptorProviders } from './helpers/http.interceptor';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordStrengthComponent } from './components/password-strength/password-strength.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardEventsComponent } from './pages/dashboard-events/dashboard-events.component';
import { DashboardUsersComponent } from './pages/dashboard-users/dashboard-users.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { EventsComponent } from './pages/events/events.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';

/* Importando a configuração de algumas linguagens */
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { EventCardDetailsComponent } from './components/event-card-details/event-card-details.component';
import { SigninSignupComponent } from './pages/signin-signup/signin-signup.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
registerLocaleData(localePT)

@NgModule({
  declarations: [
    AppComponent,
    PasswordStrengthComponent,
    SidebarComponent,
    DashboardEventsComponent,
    DashboardUsersComponent,
    BarChartComponent,
    PieChartComponent,
    EventsComponent,
    NavbarComponent,
    EventCardComponent,
    FooterComponent,
    EventDetailsComponent,
    EventCardDetailsComponent,
    SigninSignupComponent,
    UserAvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
