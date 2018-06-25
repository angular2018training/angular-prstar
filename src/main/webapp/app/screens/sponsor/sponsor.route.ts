import { Route } from '@angular/router';
import { SponsorComponent } from './sponsor.component';
import { UserRouteAccessService } from '../../shared';

export const sponsorRoute: Route = {
    path: 'sponsor',
    component: SponsorComponent,
    data: {
        authorities: ['ROLE_PRO'],
        pageTitle: 'Sponsor'
    },
    canActivate: [UserRouteAccessService]
};
