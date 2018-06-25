import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InterviewTemplateComponent } from './interview-template.component';
import { InterviewTemplateDetailComponent } from './interview-template-detail.component';
import { InterviewTemplatePopupComponent } from './interview-template-dialog.component';
import { InterviewTemplateDeletePopupComponent } from './interview-template-delete-dialog.component';

export const interviewTemplateRoute: Routes = [
    {
        path: 'interview-template',
        component: InterviewTemplateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewTemplate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'interview-template/:id',
        component: InterviewTemplateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewTemplate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interviewTemplatePopupRoute: Routes = [
    {
        path: 'interview-template-new',
        component: InterviewTemplatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interview-template/:id/edit',
        component: InterviewTemplatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interview-template/:id/delete',
        component: InterviewTemplateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.interviewTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
