import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    TitlePrefixService
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
        TitlePrefixService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebTitlePrefixModule {}
