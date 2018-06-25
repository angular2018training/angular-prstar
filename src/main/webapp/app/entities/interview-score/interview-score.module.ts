import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    InterviewScoreService,
    InterviewScorePopupService,
    InterviewScoreComponent,
    InterviewScoreDetailComponent,
    InterviewScoreDialogComponent,
    InterviewScorePopupComponent,
    InterviewScoreDeletePopupComponent,
    InterviewScoreDeleteDialogComponent,
    interviewScoreRoute,
    interviewScorePopupRoute,
} from './';

const ENTITY_STATES = [
    ...interviewScoreRoute,
    ...interviewScorePopupRoute,
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InterviewScoreComponent,
        InterviewScoreDetailComponent,
        InterviewScoreDialogComponent,
        InterviewScoreDeleteDialogComponent,
        InterviewScorePopupComponent,
        InterviewScoreDeletePopupComponent,
    ],
    entryComponents: [
        InterviewScoreComponent,
        InterviewScoreDialogComponent,
        InterviewScorePopupComponent,
        InterviewScoreDeleteDialogComponent,
        InterviewScoreDeletePopupComponent,
    ],
    providers: [
        InterviewScoreService,
        InterviewScorePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebInterviewScoreModule {}
