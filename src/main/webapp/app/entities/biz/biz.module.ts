import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import { ProstarsWebAdminModule } from '../../admin/admin.module';
import {
    BizService
} from './';

@NgModule({
    imports: [
        ProstarsWebSharedModule,
    ],
    declarations: [
    ],
    entryComponents: [
    ],
    providers: [
        BizService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebBizModule {}
