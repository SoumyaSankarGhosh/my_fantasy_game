import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './components/public/public.component';
import { PrivateComponent } from './components/private/private.component';
import { FooterComponent } from './components/private/includes/footer/footer.component';
import { HeaderComponent } from './components/private/includes/header/header.component';
import { SidebarComponent } from './components/private/includes/sidebar/sidebar.component';
import { Interceptor } from '../app/helpers/interceptor';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component'; 
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth-guard.service';
import { SettingComponent } from './components/setting/setting.component';
import { DashboardModule } from '../app/modules/dashboard/dashboard.module'

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PrivateComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
