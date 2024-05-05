import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SingleMovieComponent } from './components/single-movie/single-movie.component';
import { MapComponent } from './components/map/map.component'
import { SettingsComponent } from './components/settings/settings.component';
import { PaymentGateComponent } from './components/payment-gate/payment-gate.component';
import { LibraryComponent } from './components/library/library.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'single-movie/:movieName', component:SingleMovieComponent},
  { path: 'map', component: MapComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'payment-gate/:movieName', component: PaymentGateComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'library', component: LibraryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
