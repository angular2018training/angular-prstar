import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChangeRequestBidComponent } from './change-request-bid.component';
import { ChangeRequestBidRoute } from './change-request-bid.route';
import { CommonModule } from '@angular/common';
import { ChangeRequestBidModalService } from './change-request-bid-modal.service';
import { ChangeRequestBidService } from './change-request-bid.service';
import { ChangeRequestBidModalComponent } from './change-request-bid-modal.component';
import { ProstarsWebSharedModule } from './../../shared';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProstarsWebSharedModule,
        RouterModule.forChild(ChangeRequestBidRoute)
    ],
    declarations: [
        ChangeRequestBidComponent,
        ChangeRequestBidModalComponent
    ],
    entryComponents: [
        ChangeRequestBidModalComponent
    ],
    providers: [
        ChangeRequestBidModalService,
        ChangeRequestBidService
    ]
})
export class ProstarsWebChangeRequestBidModule { }