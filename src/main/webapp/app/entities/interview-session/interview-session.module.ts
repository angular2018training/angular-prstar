import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    InterviewSessionService,
    InterviewSessionPopupService,
    InterviewSessionComponent,
    InterviewSessionDetailComponent,
    InterviewSessionDialogComponent,
    InterviewSessionPopupComponent,
    InterviewSessionDeletePopupComponent,
    InterviewSessionDeleteDialogComponent,
    interviewSessionRoute,
    interviewSessionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...interviewSessionRoute,
    ...interviewSessionPopupRoute,
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InterviewSessionComponent,
        InterviewSessionDetailComponent,
        InterviewSessionDialogComponent,
        InterviewSessionDeleteDialogComponent,
        InterviewSessionPopupComponent,
        InterviewSessionDeletePopupComponent,
    ],
    entryComponents: [
        InterviewSessionComponent,
        InterviewSessionDialogComponent,
        InterviewSessionPopupComponent,
        InterviewSessionDeleteDialogComponent,
        InterviewSessionDeletePopupComponent,
    ],
    providers: [
        InterviewSessionService,
        InterviewSessionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebInterviewSessionModule {}
