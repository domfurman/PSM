import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import { SingleMovieComponent } from './components/single-movie/single-movie.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { LibraryComponent } from './components/library/library.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PaymentGateComponent } from './components/payment-gate/payment-gate.component';
import { MapComponent } from './components/map/map.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SingleMovieComponent,
  
    BackButtonComponent,
    LibraryComponent,
    SettingsComponent,
    PaymentGateComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
  ],
  providers: [FirestoreModule, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
