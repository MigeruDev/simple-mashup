import { Routes } from '@angular/router';

import { ForecastingComponent } from '../../forecasting/forecasting.component';
import { HotelComponent } from '../../hotel/hotel.component';
import { DevsComponent} from '../../devs/devs.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'forecasting',      component: ForecastingComponent },
    { path: 'hotel',   component: HotelComponent },
    { path: 'devs',     component: DevsComponent },
];
