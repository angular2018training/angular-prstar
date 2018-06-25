import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RolesOfProjectPageComponent } from './containers/roles-of-project-page/roles-of-project-page.component';
import { BizInterviewComponent } from './biz-interview.component';
import { InterviewListPerRolePageComponent } from './containers/interview-list-per-role-page/interview-list-per-role-page.component';
import { UserRouteAccessService } from '../../shared';

const routes: Routes = [
  {
    path: 'biz-interview',
    component: BizInterviewComponent,
    data: {
      authorities: ['ROLE_BIZ'],
      pageTitle: 'prostarsWebApp.interview.home.title'
    },
    canActivate: [UserRouteAccessService],
    children: [
      {
        path: ':projectId',
        children: [
          {
            path: '',
            component: RolesOfProjectPageComponent,
            data: {
              authorities: ['ROLE_BIZ'],
              pageTitle: 'prostarsWebApp.interview.home.title'
            },
            canActivate: [UserRouteAccessService]
          },
          {
            path: 'interviews-per-role/:roleId',
            component: InterviewListPerRolePageComponent,
            data: {
              authorities: ['ROLE_BIZ'],
              pageTitle: 'prostarsWebApp.interview.home.title'
            },
            canActivate: [UserRouteAccessService]
          }
        ]
      },
      {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BizInterviewRoutingModule {}
