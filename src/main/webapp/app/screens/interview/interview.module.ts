import { ProInterviewComponent } from './pro-interview.component';
import { ProInterviewScheduleTabComponent } from './pro-interview-schedule-tab/tab-schedule.component';
import { ProInterviewProjectTabComponent } from './pro-interview-project-tab.component';

import { TabScheduleService } from './pro-interview-schedule-tab/modal/modal.component.service';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProstarsWebSharedModule } from '../../shared';
import { NgModule } from "@angular/core";
import {RatingModule} from "ngx-rating";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { INTERVIEW_ROUTE } from './interview.route'
import { InterviewService } from './pro-interview-schedule-tab/services/interview.service';
import { ConfirmModalComponent } from './pro-interview-schedule-tab/confirm-modal/confirm-modal.component';
import { NotificationModalComponent } from './pro-interview-schedule-tab/notification-modal/notification-modal.component';

import { TimezonePickerModule } from './../../shared/ng2-timezone-selector';
@NgModule({
  imports: [
    ProstarsWebSharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(INTERVIEW_ROUTE),
    TimezonePickerModule
  ],
  declarations: [
    ProInterviewProjectTabComponent,
    ProInterviewScheduleTabComponent,
    ProInterviewComponent,
    ConfirmModalComponent,
    NotificationModalComponent
  ],
  entryComponents: [
    ConfirmModalComponent,
    NotificationModalComponent
  ],
  providers: [
    TabScheduleService,
    InterviewService
  ],
})
export class InterviewModule {}
