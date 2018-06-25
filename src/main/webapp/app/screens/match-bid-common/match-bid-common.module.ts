import { FormsModule } from '@angular/forms';

import { MatchCommonProjectComponent } from './match-component/match-common-project.component';
import { MatchCommonIndividualComponent } from './match-component/match-common-individual.component';
import { BidCommonProjectComponent } from './bid-component/bid-common-project.component';
import { BidCommonIndividualComponent } from './bid-component/bid-common-individual.component';

import { MatchBidCommonRoutingModule } from './match-bid-common.route';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RatingModule } from "ngx-rating";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ProstarsWebSharedModule } from '../../shared';


import { MatchReportComponent } from './match-component/match-report.component';
import { ProListComponent } from './pro-list.component';
import { ProProfileComponent } from './pro-profile.component';
import { BidReportComponent } from './bid-component/bid-report.component';
import { MatchService } from './match-component/match-bid-common.service';
import { BidUserService } from './bid-component/bid-common.service';
import { ChangeRequestBidComponent } from '../change-request-bid/change-request-bid.component';
import { ChangeRequestBidModalComponent } from '../change-request-bid/change-request-bid-modal.component';
import { ChangeRequestBidService } from '../change-request-bid/change-request-bid.service';
import { ChangeRequestBidModalService } from '../change-request-bid/change-request-bid-modal.service';
import { ScheduleInterviewComponent } from './../schedule-interview/schedule-interview.component';
import { AngularMultiSelectModule } from './../../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';
import { ScheduleInterviewService } from '../schedule-interview/schedule-interview.service';
import { TimezonePickerModule } from './../../shared/ng2-timezone-selector';

@NgModule({
  imports: [
    ProstarsWebSharedModule,
    CommonModule,
    RouterModule.forChild(MatchBidCommonRoutingModule),
    RatingModule,
    FormsModule,
    InfiniteScrollModule,
    AngularMultiSelectModule,
    TimezonePickerModule
  ],
  declarations: [
    MatchCommonProjectComponent,
    MatchCommonIndividualComponent,
    BidCommonProjectComponent,
    BidCommonIndividualComponent,
    MatchReportComponent,
    BidReportComponent,
    ProListComponent,
    ProProfileComponent,
    ChangeRequestBidComponent,
    ChangeRequestBidModalComponent,
    ScheduleInterviewComponent
  ],
  entryComponents: [
    ChangeRequestBidModalComponent
  ],
  providers: [
    BidUserService,
    ChangeRequestBidService,
    ChangeRequestBidModalService,
    ScheduleInterviewService,
    MatchService
  ],
})
export class ProstarsWebMatchBidCommonModule {}
