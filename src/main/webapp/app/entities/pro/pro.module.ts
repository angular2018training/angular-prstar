import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import { ProstarsWebAdminModule } from '../../admin/admin.module';
import {
    ProService,
} from './';

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        ProstarsWebAdminModule
    ],
    declarations: [
    ],
    entryComponents: [
    ],
    providers: [
        ProService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebProModule {}
