import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountRegisterComponent } from './components/account-register/account-register.component';
import { AccountAuthComponent } from './components/account-auth/account-auth.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BodyComponent } from './components/body/body.component';
import { MainComponent } from './components/main/main.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { HistorialComponent } from './components/historial/historial.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    AccountRegisterComponent,
    AccountAuthComponent,
    SideNavComponent,
    BodyComponent,
    MainComponent,
    TransactionsComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
