import { BizProfileContractsComponent } from './biz-profile-contracts.component';
import { BizProfileSummaryComponent } from './biz-profile-summary.component';
import { BizProfileCompanyBioComponent } from './biz-profile-company-bio.component';
// import { BizProfileKeyRolesComponent } from './biz-profile-key-roles.component';
// import { BizProfileContactComponent } from './biz-profile-contact.component';
// import { BizInfoPlanningComponent } from './biz-info-planning.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import {
    BizProfileComponent,
    BizProfileKeyRolesComponent,
    BizProfileContactComponent,
    BizInfoPlanningComponent
} from './';

export const BizProfileRoute: Routes = [
    {
        path: 'biz-info-planning',
        component: BizInfoPlanningComponent,
        data: {
            authorities: [],
            pageTitle: 'Information Planning'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'biz-profile',
        component: BizProfileComponent,
        data: {
            authorities: [],
            pageTitle: 'prostarsWebApp.biz.home.title'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                component: BizProfileContactComponent,
                data: {
                    authorities: [],
                    pageTitle: 'prostarsWebApp.biz.home.title'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'key-roles-activation',
                component: BizProfileKeyRolesComponent,
                data: {
                    authorities: [],
                    pageTitle: 'Key Roles'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'key-roles',
                component: BizProfileKeyRolesComponent,
                data: {
                    authorities: ['ROLE_BIZ'],
                    pageTitle: 'Key Roles'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'company-bio-activation',
                component: BizProfileCompanyBioComponent,
                data: {
                    authorities: [],
                    pageTitle: 'Company Bio'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'company-bio',
                component: BizProfileCompanyBioComponent,
                data: {
                    authorities: ['ROLE_BIZ'],
                    pageTitle: 'Company Bio'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'contracts-activation',
                component: BizProfileContractsComponent,
                data: {
                    authorities: [],
                    pageTitle: 'Contracts'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'contracts',
                component: BizProfileContractsComponent,
                data: {
                    authorities: ['ROLE_PRO', 'ROLE_BIZ'],
                    pageTitle: 'Contracts'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'summary',
                component: BizProfileSummaryComponent,
                data: {
                    authorities: ['ROLE_PRO', 'ROLE_BIZ'],
                    pageTitle: 'Summary'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];
