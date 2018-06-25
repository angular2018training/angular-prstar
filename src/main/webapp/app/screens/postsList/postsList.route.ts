import { Routes } from '@angular/router';

import { PostsListComponent } from './postsList.component';
import { UserRouteAccessService } from '../../shared';

export const PostsListRoute: Routes = [
    {
        path: 'postsList',
        component: PostsListComponent,
        data: {
            authorities: ['ROLE_BIZ'],
            pageTitle: 'prostarsWebApp.matching.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
