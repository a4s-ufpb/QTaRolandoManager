import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
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
registerLocaleData(localePT)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    EventCardDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
