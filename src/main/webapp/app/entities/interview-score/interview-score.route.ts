import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InterviewScoreComponent } from './interview-score.component';
import { InterviewScoreDetailComponent } from './interview-score-detail.component';
import { InterviewScorePopupComponent } from './interview-score-dialog.component';
import { InterviewScoreDeletePopupComponent } from './interview-score-delete-dialog.component';

export const interviewScoreRoute: Routes = [
    {
        path: 'interview-score',
        component: InterviewScoreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewScore.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'interview-score/:id',
        component: InterviewScoreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewScore.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interviewScorePopupRoute: Routes = [
    {
        path: 'interview-score-new',
        component: InterviewScorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewScore.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interview-score/:id/edit',
        component: InterviewScorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewScore.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interview-score/:id/delete',
        component: InterviewScoreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewScore.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
