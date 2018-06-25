import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_PRO', 'ROLE_BIZ', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.account.password'
    },
    canActivate: [UserRouteAccessService]
};
