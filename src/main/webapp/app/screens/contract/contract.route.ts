import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { ContractTemplateComponent } from '../contract/contract-template/contract-template.component';
import { ContractPendingComponent } from '../contract/contract-pending/contract-peding.component';
import { ContractCompletedComponent } from '../contract/contract-completed/contract-completed.component';
import { ContractDetailComponent } from '../contract/contract-pending/contract-detail.component';
import { ContractStatusComponent } from './contract-completed/contract-status.component';

export const ContractRoute: Routes = [
    {
        path: 'contract-template',
        component: ContractTemplateComponent,
        data: {
            authorities: ['ROLE_BIZ'],
            pageTitle: 'prostarsWebApp.contractTemplate.detail.title'
        },
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'contract-pending',
        data: {
            authorities: ['ROLE_BIZ', 'ROLE_PRO'],
            pageTitle: 'prostarsWebApp.contract.contractPending'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                component: ContractPendingComponent,
            },
            {
                path: ':id',
                component: ContractDetailComponent,
            }
        ]
    },
    {
        path: 'contract-completed',
        data: {
            authorities: ['ROLE_BIZ', 'ROLE_PRO'],
            pageTitle: 'prostarsWebApp.contract.completedContract'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                component: ContractCompletedComponent,
            },
            {
                path: ':id',
                component: ContractStatusComponent,
            }
        ]
    },
];