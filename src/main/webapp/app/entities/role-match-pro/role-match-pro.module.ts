import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    RoleMatchProService,
    RoleMatchProPopupService,
    RoleMatchProComponent,
    RoleMatchProDetailComponent,
    RoleMatchProDialogComponent,
    RoleMatchProPopupComponent,
    RoleMatchProDeletePopupComponent,
    RoleMatchProDeleteDialogComponent,
    roleMatchProRoute,
    roleMatchProPopupRoute,
} from './';

const ENTITY_STATES = [
    ...roleMatchProRoute,
    ...roleMatchProPopupRoute,
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoleMatchProComponent,
        RoleMatchProDetailComponent,
        RoleMatchProDialogComponent,
        RoleMatchProDeleteDialogComponent,
        RoleMatchProPopupComponent,
        RoleMatchProDeletePopupComponent,
    ],
    entryComponents: [
        RoleMatchProComponent,
        RoleMatchProDialogComponent,
        RoleMatchProPopupComponent,
        RoleMatchProDeleteDialogComponent,
        RoleMatchProDeletePopupComponent,
    ],
    providers: [
        RoleMatchProService,
        RoleMatchProPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebRoleMatchProModule {}
