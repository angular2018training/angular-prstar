import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    CompanySizeService
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
        CompanySizeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebCompanySizeModule {}
