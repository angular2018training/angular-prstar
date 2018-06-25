import { Routes } from '@angular/router';

import { MatchingComponent } from './matching.component';
import { MatchingLandingComponent } from './matching-landing.component';
import { UserRouteAccessService } from '../../shared';

export const MatchingRoute: Routes = [
    {
        path: 'matching-landing',
        component: MatchingLandingComponent,
        data: {
            authorities: ['ROLE_PRO'],
            pageTitle: 'prostarsWebApp.matching.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
