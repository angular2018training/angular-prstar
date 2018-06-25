import { UserRouteAccessService } from './../../shared/auth/user-route-access-service';
import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { ProNetworkComponent } from './pro-network.component';
import { ReferralStatusComponent } from './pro-network-referral-status.component';

export const ProNetworkRoutingModule: Routes = [
  {
    path: 'pro-network',
    component: ProNetworkComponent,
    data: {
      authorities: ['ROLE_PRO'],
      pageTitle: 'global.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'referral-status',
    component: ReferralStatusComponent,
    data: {
      authorities: ['ROLE_PRO'],
      pageTitle: 'global.title'
    }
  }
];
