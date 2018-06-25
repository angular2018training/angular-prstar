import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    SuggestedInterviewScheduleService,
    SuggestedInterviewSchedulePopupService,
    SuggestedInterviewScheduleComponent,
    SuggestedInterviewScheduleDetailComponent,
    SuggestedInterviewScheduleDialogComponent,
    SuggestedInterviewSchedulePopupComponent,
    SuggestedInterviewScheduleDeletePopupComponent,
    SuggestedInterviewScheduleDeleteDialogComponent,
    suggestedInterviewScheduleRoute,
    suggestedInterviewSchedulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...suggestedInterviewScheduleRoute,
    ...suggestedInterviewSchedulePopupRoute,
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SuggestedInterviewScheduleComponent,
        SuggestedInterviewScheduleDetailComponent,
        SuggestedInterviewScheduleDialogComponent,
        SuggestedInterviewScheduleDeleteDialogComponent,
        SuggestedInterviewSchedulePopupComponent,
        SuggestedInterviewScheduleDeletePopupComponent,
    ],
    entryComponents: [
        SuggestedInterviewScheduleComponent,
        SuggestedInterviewScheduleDialogComponent,
        SuggestedInterviewSchedulePopupComponent,
        SuggestedInterviewScheduleDeleteDialogComponent,
        SuggestedInterviewScheduleDeletePopupComponent,
    ],
    providers: [
        SuggestedInterviewScheduleService,
        SuggestedInterviewSchedulePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebSuggestedInterviewScheduleModule {}
