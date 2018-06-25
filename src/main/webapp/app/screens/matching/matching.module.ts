import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    MatchingComponent,
    MatchingLandingComponent,
    MatchingService,
    MatchingRoute
} from './';

const ENTITY_STATES = [
    ...MatchingRoute
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MatchingComponent,
        MatchingLandingComponent
    ],
    entryComponents: [
        MatchingComponent,
        MatchingLandingComponent
    ],
    providers: [
        MatchingService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebMatchingModule {}
