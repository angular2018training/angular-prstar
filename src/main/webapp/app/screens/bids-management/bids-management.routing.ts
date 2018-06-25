import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { RolesPage } from './pages/roles/roles.page';

const routes: Routes = [
  {
    path: 'bid-wall',
    component: RolesPage,
    data: {
        authorities: ['ROLE_PRO', 'ROLE_BIZ'],
        pageTitle: 'global.title'
    },
    canActivate: [UserRouteAccessService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidsManagementRoutingModule { }
