import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RoleMatchProComponent } from './role-match-pro.component';
import { RoleMatchProDetailComponent } from './role-match-pro-detail.component';
import { RoleMatchProPopupComponent } from './role-match-pro-dialog.component';
import { RoleMatchProDeletePopupComponent } from './role-match-pro-delete-dialog.component';

export const roleMatchProRoute: Routes = [
    {
        path: 'role-match-pro',
        component: RoleMatchProComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.roleMatchPro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'role-match-pro/:id',
        component: RoleMatchProDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.roleMatchPro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roleMatchProPopupRoute: Routes = [
    {
        path: 'role-match-pro-new',
        component: RoleMatchProPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.roleMatchPro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'role-match-pro/:id/edit',
        component: RoleMatchProPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.roleMatchPro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'role-match-pro/:id/delete',
        component: RoleMatchProDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.roleMatchPro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
