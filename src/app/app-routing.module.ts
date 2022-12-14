import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RankComponent } from './rank/rank.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'rank', component: RankComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
  
export class AppRoutingModule { }
