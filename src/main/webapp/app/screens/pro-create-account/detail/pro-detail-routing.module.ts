import { ProDetailContactComponent } from './pro-detail-contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProDetailProfileComponent } from './pro-detail-profile.component';
import { ProDetailBackgroundComponent } from './pro-detail-background.component';
import { ProDetailBioSkillComponent } from './pro-detail-bio-skill.component';
import { ProDetailSummaryComponent } from './pro-detail-summary.component';
import { UserRouteAccessService } from '../../../shared';

export const PRO_DETAIL_PROFILE_ROUTE: Routes = [
  {
    path: 'pro-create-detail',
    component: ProDetailProfileComponent,
    data: {
        authorities: ['ROLE_PRO', 'ROLE_BIZ'],
        pageTitle: 'global.title'
    },
    // canActivate: [UserRouteAccessService],
    children: [
      {
        path: '',
        component: ProDetailContactComponent,
        data: {
            authorities: ['ROLE_PRO', 'ROLE_BIZ'],
            pageTitle: 'global.title'
        },
        // canActivate: [UserRouteAccessService]
      },
      {
        path: 'background',
        component: ProDetailBackgroundComponent,
        data: {
            authorities: ['ROLE_PRO', 'ROLE_BIZ'],
            pageTitle: 'global.title'
        },
        // canActivate: [UserRouteAccessService]
      },
      {
        path: 'bio-skill',
        component: ProDetailBioSkillComponent,
        data: {
            authorities: ['ROLE_PRO', 'ROLE_BIZ'],
            pageTitle: 'global.title'
        },
        // canActivate: [UserRouteAccessService]
      },
      {
        path: 'summary',
        component: ProDetailSummaryComponent,
        data: {
            authorities: ['ROLE_PRO', 'ROLE_BIZ'],
            pageTitle: 'global.title'
        },
        // canActivate: [UserRouteAccessService]
      }
    ]
  }
];
