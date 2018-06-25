import { MatchCommonProjectComponent } from './match-component/match-common-project.component';
import { MatchCommonIndividualComponent } from './match-component/match-common-individual.component';
import { BidCommonProjectComponent } from './bid-component/bid-common-project.component';
import { BidCommonIndividualComponent } from './bid-component/bid-common-individual.component';

import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const MatchBidCommonRoutingModule: Routes = [
  {
    path: 'match-common-project',
    component: MatchCommonProjectComponent,
    data: {
        authorities: ['ROLE_PRO', 'ROLE_BIZ'],
        pageTitle: 'global.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'match-common-individual',
    component: MatchCommonIndividualComponent,
    data: {
        authorities: ['ROLE_PRO', 'ROLE_BIZ'],
        pageTitle: 'global.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'bid-common-project',
    component: BidCommonProjectComponent,
    data: {
        authorities: ['ROLE_PRO', 'ROLE_BIZ'],
        pageTitle: 'global.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'bid-common-individual',
    component: BidCommonIndividualComponent,
    data: {
        authorities: ['ROLE_PRO', 'ROLE_BIZ'],
        pageTitle: 'global.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
