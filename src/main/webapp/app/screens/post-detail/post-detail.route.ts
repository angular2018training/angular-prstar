import { Routes } from '@angular/router';

import { PostDetailComponent } from './post-detail.component';
import { UserRouteAccessService } from '../../shared';

export const PostDetailRoute: Routes = [
    {
        path: 'post-detail/:id',
        component: PostDetailComponent,
        data: {
            authorities: ['ROLE_PRO'],
            pageTitle: 'prostarsWebApp.matching.title'
        },
        canActivate: [UserRouteAccessService]
    }
];