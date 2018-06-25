import { BidDetailComponent } from './bid-detail/bid-detail.component';
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BidNewComponent } from './bid-new.component'

export const BidRoute: Routes = [
    {
        path: 'create-bid',
        component: BidNewComponent,
        data: {
            authorities: ['ROLE_PRO', 'ROLE_ADMIN'],
            pageTitle: 'prostarsWebApp.bid.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bid/:id',
        component: BidDetailComponent,
        data: {
            authorities: [],
            pageTitle: 'global.title'
        },
        canActivate: [UserRouteAccessService]
    }

];