import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    ContractService,
    ContractPopupService,
    ContractComponent,
    ContractDetailComponent,
    ContractDialogComponent,
    ContractPopupComponent,
    ContractDeletePopupComponent,
    ContractDeleteDialogComponent,
} from './';

const ENTITY_STATES = [
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContractComponent,
        ContractDetailComponent,
        ContractDialogComponent,
        ContractDeleteDialogComponent,
        ContractPopupComponent,
        ContractDeletePopupComponent,
    ],
    entryComponents: [
        ContractComponent,
        ContractDialogComponent,
        ContractPopupComponent,
        ContractDeleteDialogComponent,
        ContractDeletePopupComponent,
    ],
    providers: [
        ContractService,
        ContractPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebContractEntityModule {}
