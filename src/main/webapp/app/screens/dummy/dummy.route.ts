import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import { DummyComponent } from './dummy.component';

export const DummyRoute: Routes = [
    {
        path: 'dummy',
        component: DummyComponent,
        data: {
            authorities: ['ROLE_PRO', 'ROLE_ADMIN'],
            pageTitle: 'prostarsWebApp.bid.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
    
];