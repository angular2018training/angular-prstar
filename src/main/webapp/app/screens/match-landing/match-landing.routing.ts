import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { BizLandingPage } from './pages/biz-landing/biz-landing.page';
import { ProLandingPage } from './pages/pro-landing/pro-landing.page';

const routes: Routes = [
  {
    path: 'biz-landing',
    component: BizLandingPage,
    data: {
        authorities: ['ROLE_BIZ'],
        pageTitle: 'global.title'
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'pro-landing',
    component: ProLandingPage,
    data: {
        authorities: ['ROLE_PRO'],
        pageTitle: 'global.title'
    },
    canActivate: [UserRouteAccessService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchLandingRoutingModule { }
