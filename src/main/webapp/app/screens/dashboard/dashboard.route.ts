import { Route } from '@angular/router';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import { DashboardComponent } from './';

export const DASHBOARD_ROUTE: Routes = [
  {
    path: 'dashboard-activation',
    component: DashboardComponent,
    data: {
        authorities: [],
        pageTitle: 'global.title'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
        authorities: ['ROLE_PRO', 'ROLE_BIZ'],
        pageTitle: 'global.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
