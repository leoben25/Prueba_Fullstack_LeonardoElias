import { Routes } from '@angular/router';
import { Services } from './pages/services/services';
import { Bookings } from './pages/bookings/bookings';

export const routes: Routes = [
  { path: '', redirectTo: 'services', pathMatch: 'full' },
  { path: 'services', component: Services },
  { path: 'bookings', component: Bookings },
];