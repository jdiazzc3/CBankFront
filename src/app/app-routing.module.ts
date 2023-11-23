import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AccountRegisterComponent } from './components/account-register/account-register.component';
import { AccountAuthComponent } from './components/account-auth/account-auth.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BodyComponent } from './components/body/body.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'user-dashboard', component: UserDashboardComponent, 
    children: [
      { path: 'side-nav', component: SideNavComponent },
      { path: 'body', component: BodyComponent },
      { path: 'main', component: MainComponent },
      { path: '', redirectTo: 'main', pathMatch: 'full' }
    ]},
  { path:'account-register/:userId', component: AccountRegisterComponent},
  { path:'account-auth/:accountId', component: AccountAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
