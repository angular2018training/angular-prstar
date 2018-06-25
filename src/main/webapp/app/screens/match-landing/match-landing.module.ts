import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchLandingService } from './match-landing.service';
import { MatchLandingRoutingModule } from './match-landing.routing';
import { BizLandingPage } from './pages/biz-landing/biz-landing.page';
import { ProLandingPage } from './pages/pro-landing/pro-landing.page';
import { InterviewService } from '../biz-interview/services/interview.service';
import { MatchService } from '../match-bid-common/match-component/match-bid-common.service';

@NgModule({
  imports: [
    CommonModule,
    MatchLandingRoutingModule,
  ],
  declarations: [
    BizLandingPage,
    ProLandingPage,
  ],
  providers: [
    MatchLandingService,
    InterviewService,
    MatchService
  ],
  entryComponents: [
  ],
})
export class MatchLandingModule { }
