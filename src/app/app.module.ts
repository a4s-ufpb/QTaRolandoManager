import { httpInterceptorProviders } from './helpers/http.interceptor';
import { NgModule } from '@angular/core';
import { OWL_DATE_TIME_LOCALE } from '@danielmoncada/angular-datetime-picker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { SigninSignupComponent } from './pages/signin-signup/signin-signup.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { CreateUpdateEventComponent } from './pages/create-update-event/create-update-event.component';
registerLocaleData(localePT)

// DateTime Picker
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { QuillModule } from 'ngx-quill';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { DraggableCategoriesComponent } from './components/draggable-categories/draggable-categories.component';
import { EventCardSkeletonComponent } from './components/skeleton/event-card-skeleton/event-card-skeleton.component';

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
    SigninSignupComponent,
    UserAvatarComponent,
    CreateUpdateEventComponent,
    AccountSettingsComponent,
    ButtonComponent,
    ModalComponent,
    DraggableCategoriesComponent,
    EventCardSkeletonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    QuillModule.forRoot(),
  ],
  providers: [
    httpInterceptorProviders,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
