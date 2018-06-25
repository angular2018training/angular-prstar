import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    InterviewTemplateService,
    InterviewTemplatePopupService,
    InterviewTemplateComponent,
    InterviewTemplateDetailComponent,
    InterviewTemplateDialogComponent,
    InterviewTemplatePopupComponent,
    InterviewTemplateDeletePopupComponent,
    InterviewTemplateDeleteDialogComponent,
    interviewTemplateRoute,
    interviewTemplatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...interviewTemplateRoute,
    ...interviewTemplatePopupRoute,
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InterviewTemplateComponent,
        InterviewTemplateDetailComponent,
        InterviewTemplateDialogComponent,
        InterviewTemplateDeleteDialogComponent,
        InterviewTemplatePopupComponent,
        InterviewTemplateDeletePopupComponent,
    ],
    entryComponents: [
        InterviewTemplateComponent,
        InterviewTemplateDialogComponent,
        InterviewTemplatePopupComponent,
        InterviewTemplateDeleteDialogComponent,
        InterviewTemplateDeletePopupComponent,
    ],
    providers: [
        InterviewTemplateService,
        InterviewTemplatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebInterviewTemplateModule {}
