import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    BidChangeRequestHistoryService,
    BidChangeRequestHistoryPopupService,
    BidChangeRequestHistoryComponent,
    BidChangeRequestHistoryDetailComponent,
    BidChangeRequestHistoryDialogComponent,
    BidChangeRequestHistoryPopupComponent,
    BidChangeRequestHistoryDeletePopupComponent,
    BidChangeRequestHistoryDeleteDialogComponent,
    bidChangeRequestHistoryRoute,
    bidChangeRequestHistoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bidChangeRequestHistoryRoute,
    ...bidChangeRequestHistoryPopupRoute,
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BidChangeRequestHistoryComponent,
        BidChangeRequestHistoryDetailComponent,
        BidChangeRequestHistoryDialogComponent,
        BidChangeRequestHistoryDeleteDialogComponent,
        BidChangeRequestHistoryPopupComponent,
        BidChangeRequestHistoryDeletePopupComponent,
    ],
    entryComponents: [
        BidChangeRequestHistoryComponent,
        BidChangeRequestHistoryDialogComponent,
        BidChangeRequestHistoryPopupComponent,
        BidChangeRequestHistoryDeleteDialogComponent,
        BidChangeRequestHistoryDeletePopupComponent,
    ],
    providers: [
        BidChangeRequestHistoryService,
        BidChangeRequestHistoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebBidChangeRequestHistoryModule {}
