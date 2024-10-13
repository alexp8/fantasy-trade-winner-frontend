import { provideRouter, Routes } from '@angular/router';
import { TradeComponent } from './components/trade/trade.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: '', component: TradeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];

export const appRoutes = provideRouter(routes);
