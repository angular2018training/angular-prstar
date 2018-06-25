import { Routes } from '@angular/router';

import { VettingComponent } from './vetting.component';
import { UserRouteAccessService } from '../../shared';

export const VettingRoute: Routes = [
    {
        path: 'vetting',
        component: VettingComponent,
        data: {
            authorities: [],
            pageTitle: 'prostarsWebApp.vetChangeLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
