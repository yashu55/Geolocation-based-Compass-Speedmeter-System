import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'geolocation', component: GeolocationComponent },
      { path: 'accountdetails', component: AccountdetailsComponent },
      { path: '', redirectTo: '/home/geolocation', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
