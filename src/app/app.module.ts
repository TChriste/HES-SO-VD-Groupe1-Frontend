import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignInPatientComponent } from './login/patient/sign-in-patient/sign-in-patient.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { LogopedisteComponent } from './logopediste/logopediste.component';
import { SignUpPatientComponent } from './login/patient/sign-up-patient/sign-up-patient.component';
import { DemandeSuiviComponent } from './patient/demande-suivi/demande-suivi.component';
import { MonCompteComponent } from './patient/mon-compte/mon-compte.component';
import { DatePipe } from './shared/date.pipe';
import { AvatarImgComponent } from './patient/avatar-img/avatar-img.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInPatientComponent,
    NavbarComponent,
    HomeComponent,
    PatientComponent,
    LogopedisteComponent,
    SignUpPatientComponent,
    DemandeSuiviComponent,
    MonCompteComponent,
    DatePipe,
    AvatarImgComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
