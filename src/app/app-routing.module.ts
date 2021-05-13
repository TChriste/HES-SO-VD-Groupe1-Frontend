import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInPatientComponent} from './login/patient/sign-in-patient/sign-in-patient.component';
import {HomeComponent} from './home/home.component';
import {LoginGuard} from './login/login.guard';
import {SignUpPatientComponent} from './login/patient/sign-up-patient/sign-up-patient.component';


const routes: Routes = [
  { path: '', component:  HomeComponent, canActivate: [LoginGuard]},
  { path: 'connexion', component: SignInPatientComponent },
  { path: 'inscription', component: SignUpPatientComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
