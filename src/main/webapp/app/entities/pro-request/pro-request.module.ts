import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    ProRequestService
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
        ProRequestService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebProRequestModule {}
