import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import { DASHBOARD_ROUTE, DashboardComponent, DashboardService } from './';
import { MatchingService } from '../matching/matching.service';

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(DASHBOARD_ROUTE)
    ],
    declarations: [
        DashboardComponent,
    ],
    entryComponents: [
    ],
    providers: [
        DashboardService,
        MatchingService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebDashboardModule {}
