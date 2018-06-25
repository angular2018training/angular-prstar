import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    ContractHistoryService,
    ContractHistoryPopupService,
    ContractHistoryComponent,
    ContractHistoryDetailComponent,
    ContractHistoryDialogComponent,
    ContractHistoryPopupComponent,
    ContractHistoryDeletePopupComponent,
    ContractHistoryDeleteDialogComponent,
    contractHistoryRoute,
    contractHistoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...contractHistoryRoute,
    ...contractHistoryPopupRoute,
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContractHistoryComponent,
        ContractHistoryDetailComponent,
        ContractHistoryDialogComponent,
        ContractHistoryDeleteDialogComponent,
        ContractHistoryPopupComponent,
        ContractHistoryDeletePopupComponent,
    ],
    entryComponents: [
        ContractHistoryComponent,
        ContractHistoryDialogComponent,
        ContractHistoryPopupComponent,
        ContractHistoryDeleteDialogComponent,
        ContractHistoryDeletePopupComponent,
    ],
    providers: [
        ContractHistoryService,
        ContractHistoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebContractHistoryModule {}
