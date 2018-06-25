//for testing only
//TODO delete me
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ChangeRequestBidComponent } from './change-request-bid.component'

export const ChangeRequestBidRoute: Routes = [
    {
        path: 'bid-change-request',
        component: ChangeRequestBidComponent,
        data: {
            authorities: ['ROLE_PRO'],
            pageTitle: 'prostarsWebApp.bid.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
    
];