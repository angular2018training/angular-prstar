import { Routes } from '@angular/router';

import { PostWallComponent } from './postWall.component';
import { UserRouteAccessService } from '../../shared';

export const PostWallRoute: Routes = [
    {
        path: 'postWall',
        component: PostWallComponent,
        data: {
            authorities: ['ROLE_PRO'],
            pageTitle: 'prostarsWebApp.matching.title'
        },
        canActivate: [UserRouteAccessService]
    }
];