import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPatientComponent} from './login/patient/login-patient.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginGuard} from './login/login.guard';


const routes: Routes = [
  // { path: '/', component:  HomeComponent, canActivate: [LoginGuard]},
  { path: '', component:  HomeComponent},
  { path: 'login', component: LoginPatientComponent },
  { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
