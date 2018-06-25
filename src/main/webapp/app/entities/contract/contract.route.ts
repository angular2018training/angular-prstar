// import { Routes } from '@angular/router';

// import { UserRouteAccessService } from '../../shared';
// import { ContractComponent } from './contract.component';
// import { ContractDetailComponent } from './contract-detail.component';
// import { ContractPopupComponent } from './contract-dialog.component';
// import { ContractDeletePopupComponent } from './contract-delete-dialog.component';

// export const contractRoute: Routes = [
//     {
//         path: 'contract',
//         component: ContractComponent,
//         data: {
//             authorities: [],
//             pageTitle: 'prostarsWebApp.contract.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }, {
//         path: 'contract-template',
//         component: ContractDetailComponent,
//         data: {
//             authorities: ['ROLE_BIZ'],
//             pageTitle: 'prostarsWebApp.contract.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];

// export const contractPopupRoute: Routes = [
//     {
//         path: 'contract-new',
//         component: ContractPopupComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'prostarsWebApp.contract.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     },
//     {
//         path: 'contract/:id/edit',
//         component: ContractPopupComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'prostarsWebApp.contract.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     },
//     {
//         path: 'contract/:id/delete',
//         component: ContractDeletePopupComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'prostarsWebApp.contract.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];
