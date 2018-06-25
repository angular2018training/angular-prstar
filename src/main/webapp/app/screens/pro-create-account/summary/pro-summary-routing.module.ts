import { ProCreateAccountComponent } from './pro-create-account.component';
import { ProSummaryProfileComponent } from './pro-summary-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProSummaryBioComponent } from './pro-summary-bio.component';
import { ProSummaryProfileSkillComponent } from './pro-summary-profile-skill.component';
import { ProSummaryProfileSummaryComponent } from './pro-summary-profile-summary.component';
import { UserRouteAccessService } from '../../../shared';

export const PRO_SUMMARY_PROFILE_ROUTE: Routes = [
  {
    path: 'pro-create-summary',
    component: ProSummaryProfileComponent,
    data: {
        authorities: [],
        pageTitle: 'global.title'
    },
    canActivate: [UserRouteAccessService],
    children: [
      {
        path: '',
        component: ProCreateAccountComponent,
        data: {
            authorities: [],
            pageTitle: 'global.title'
        },
        canActivate: [UserRouteAccessService]
      },
      {
        path: 'pro-summary-bio',
        component: ProSummaryBioComponent,
        data: {
            authorities: [],
            pageTitle: 'global.title'
        },
        canActivate: [UserRouteAccessService]
      },
      {
        path: 'pro-summary-profile-skill',
        component: ProSummaryProfileSkillComponent,
        data: {
            authorities: [],
            pageTitle: 'global.title'
        },
        canActivate: [UserRouteAccessService]
      },
      {
          path: 'pro-summary-profile-summary',
          component: ProSummaryProfileSummaryComponent,
          data: {
              authorities: [],
              pageTitle: 'global.title'
          },
          canActivate: [UserRouteAccessService]
      }
    ]
  }
];
