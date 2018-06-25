import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BidChangeRequestHistoryComponent } from './bid-change-request-history.component';
import { BidChangeRequestHistoryDetailComponent } from './bid-change-request-history-detail.component';
import { BidChangeRequestHistoryPopupComponent } from './bid-change-request-history-dialog.component';
import { BidChangeRequestHistoryDeletePopupComponent } from './bid-change-request-history-delete-dialog.component';

export const bidChangeRequestHistoryRoute: Routes = [
    {
        path: 'bid-change-request-history',
        component: BidChangeRequestHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.bidChangeRequestHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bid-change-request-history/:id',
        component: BidChangeRequestHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.bidChangeRequestHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bidChangeRequestHistoryPopupRoute: Routes = [
    {
        path: 'bid-change-request-history-new',
        component: BidChangeRequestHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.bidChangeRequestHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bid-change-request-history/:id/edit',
        component: BidChangeRequestHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.bidChangeRequestHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bid-change-request-history/:id/delete',
        component: BidChangeRequestHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.bidChangeRequestHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
