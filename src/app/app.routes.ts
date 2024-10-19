import { provideRouter, Routes } from '@angular/router';
import { TradeComponent } from './components/trade/trade.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyLeaguesComponent } from './components/my-leagues/my-leagues.component';

export const routes: Routes = [
  { path: '', component: TradeComponent },
  { path: 'my-leagues', component: MyLeaguesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];

export const appRoutes = provideRouter(routes);
