import { ProInterviewScheduleTabComponent } from './pro-interview-schedule-tab/tab-schedule.component';
import { ProInterviewProjectTabComponent } from './pro-interview-project-tab.component';
import { UserRouteAccessService } from './../../shared/auth/user-route-access-service';
import { ProInterviewComponent } from './pro-interview.component';
import { Routes } from '@angular/router';


export const INTERVIEW_ROUTE: Routes = [
    {
        path: 'pro-interview',
        component: ProInterviewComponent,
        data: {
            authorities: ['ROLE_PRO', 'ROLE_BIZ'],
            pageTitle: 'global.title'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                component: ProInterviewProjectTabComponent,
                data: {
                    authorities: ['ROLE_PRO', 'ROLE_BIZ'],
                    pageTitle: 'global.title'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'schedule',
                component: ProInterviewScheduleTabComponent,
                data: {
                    authorities: ['ROLE_PRO', 'ROLE_BIZ'],
                    pageTitle: 'global.title'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];
