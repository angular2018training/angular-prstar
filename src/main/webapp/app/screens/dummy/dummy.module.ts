import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    DummyService,
    DummyComponent,
    DummyRoute,
} from './';

const ENTITY_STATES = [
    ...DummyRoute,
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES),
    ],
    declarations: [
        DummyComponent
    ],
    entryComponents: [
        DummyComponent
    ],
    providers: [
        DummyService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebDummyModule {}
