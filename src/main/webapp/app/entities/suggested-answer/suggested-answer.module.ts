import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    SuggestedAnswerService
} from './';

@NgModule({
    imports: [
        ProstarsWebSharedModule
    ],
    declarations: [
    ],
    entryComponents: [
    ],
    providers: [
        SuggestedAnswerService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebSuggestedAnswerModule {}
