import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BizInterviewRoutingModule } from './biz-interview-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BizInterviewComponent } from './biz-interview.component';
import { RolesOfProjectPageComponent } from './containers/roles-of-project-page/roles-of-project-page.component';
import { InterviewListPerRolePageComponent } from './containers/interview-list-per-role-page/interview-list-per-role-page.component';
import { ProjectTabComponent } from './components/project-tab/project-tab.component';
import { ScheduleTabComponent } from './components/schedule-tab/tab-schedule.component';
import { ScheduleDateComponent } from './components/schedule-tab/date/schedule-datepicker.component';
import { ScheduleTimeComponent } from './components/schedule-tab/time/schedule-timepicker.component';
import { InterviewService } from './services/interview.service';
import { ProListInterviewComponent } from './components/pro-list-interview/pro-list-interview.component';
import { InterviewSummaryComponent } from './components/interview-summary/interview-summary.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import { RatingModule } from 'ngx-rating';
import { TimezonePickerModule } from './../../shared/ng2-timezone-selector';

@NgModule({
  declarations: [
    BizInterviewComponent,
    RolesOfProjectPageComponent,
    InterviewListPerRolePageComponent,
    ProjectTabComponent,
    ScheduleTabComponent,
    ScheduleDateComponent,
    ScheduleTimeComponent,
    ProListInterviewComponent,
    InterviewSummaryComponent,
    ConfirmModalComponent,
    NotificationModalComponent
  ],
  entryComponents: [ConfirmModalComponent,NotificationModalComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BizInterviewRoutingModule,
    RatingModule,
    TimezonePickerModule
  ],
  exports: [],
  providers: [InterviewService]
})
export class BizInterviewModule {}
