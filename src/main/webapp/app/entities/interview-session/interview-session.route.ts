import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InterviewSessionComponent } from './interview-session.component';
import { InterviewSessionDetailComponent } from './interview-session-detail.component';
import { InterviewSessionPopupComponent } from './interview-session-dialog.component';
import { InterviewSessionDeletePopupComponent } from './interview-session-delete-dialog.component';

export const interviewSessionRoute: Routes = [
    {
        path: 'interview-session',
        component: InterviewSessionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewSession.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'interview-session/:id',
        component: InterviewSessionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewSession.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interviewSessionPopupRoute: Routes = [
    {
        path: 'interview-session-new',
        component: InterviewSessionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewSession.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interview-session/:id/edit',
        component: InterviewSessionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewSession.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interview-session/:id/delete',
        component: InterviewSessionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewSession.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
