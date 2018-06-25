import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ContractHistoryComponent } from './contract-history.component';
import { ContractHistoryDetailComponent } from './contract-history-detail.component';
import { ContractHistoryPopupComponent } from './contract-history-dialog.component';
import { ContractHistoryDeletePopupComponent } from './contract-history-delete-dialog.component';

export const contractHistoryRoute: Routes = [
    {
        path: 'contract-history',
        component: ContractHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.contractHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contract-history/:id',
        component: ContractHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.contractHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contractHistoryPopupRoute: Routes = [
    {
        path: 'contract-history-new',
        component: ContractHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.contractHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contract-history/:id/edit',
        component: ContractHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.contractHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contract-history/:id/delete',
        component: ContractHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.contractHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
