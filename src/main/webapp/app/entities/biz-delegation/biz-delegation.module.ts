import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    BizDelegationService
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
        BizDelegationService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebBizDelegationModule {}
