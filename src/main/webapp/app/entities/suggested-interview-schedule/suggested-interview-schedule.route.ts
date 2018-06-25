import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SuggestedInterviewScheduleComponent } from './suggested-interview-schedule.component';
import { SuggestedInterviewScheduleDetailComponent } from './suggested-interview-schedule-detail.component';
import { SuggestedInterviewSchedulePopupComponent } from './suggested-interview-schedule-dialog.component';
import { SuggestedInterviewScheduleDeletePopupComponent } from './suggested-interview-schedule-delete-dialog.component';

export const suggestedInterviewScheduleRoute: Routes = [
    {
        path: 'suggested-interview-schedule',
        component: SuggestedInterviewScheduleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.suggestedInterviewSchedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'suggested-interview-schedule/:id',
        component: SuggestedInterviewScheduleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.suggestedInterviewSchedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const suggestedInterviewSchedulePopupRoute: Routes = [
    {
        path: 'suggested-interview-schedule-new',
        component: SuggestedInterviewSchedulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.suggestedInterviewSchedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'suggested-interview-schedule/:id/edit',
        component: SuggestedInterviewSchedulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.suggestedInterviewSchedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'suggested-interview-schedule/:id/delete',
        component: SuggestedInterviewScheduleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prostarsWebApp.suggestedInterviewSchedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
