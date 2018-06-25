import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProstarsWebBizModule } from './biz/biz.module';
import { ProstarsWebCompanySizeModule } from './company-size/company-size.module';
import { ProstarsWebProModule } from './pro/pro.module';
import { ProstarsWebSkillModule } from './skill/skill.module';
import { ProstarsWebProjectModule } from './project/project.module';
import { ProstarsWebProRequirementModule } from './pro-requirement/pro-requirement.module';
import { ProstarsWebPostModule } from './post/post.module';
import { ProstarsWebSponsorModule } from '../screens/sponsor/sponsor.module';
import { ProstarsWebProCommissionModule } from './pro-commission/pro-commission.module';
import { ProstarsWebPhoneModule } from './phone/phone.module';
import { ProstarsWebTitlePrefixModule } from './title-prefix/title-prefix.module';
import { ProstarsWebBizDelegationModule } from './biz-delegation/biz-delegation.module';
import { ProstarsWebFileModule } from './file/file.module';
import { ProstarsWebQuestionModule } from './question/question.module';
import { ProstarsWebSuggestedAnswerModule } from './suggested-answer/suggested-answer.module';
import { ProstarsWebPaymentTermModule } from './payment-term/payment-term.module';
import { ProstarsWebInvoiceTermModule } from './invoice-term/invoice-term.module';
import { ProstarsWebCityModule } from './city/city.module';
import { ProstarsWebStateModule } from './state/state.module';
import { ProstarsWebProRequestModule } from './pro-request/pro-request.module';
import { ProstarsWebMatchReportModule } from './match-report/match-report.module';
import { ProstarsWebNotificationModule } from './notification/notification.module';
import { ProstarsWebRoleMatchProModule } from './role-match-pro/role-match-pro.module';
import { ProstarsWebInterviewModule } from './interview/interview.module';
import { ProstarsWebInterviewSessionModule } from './interview-session/interview-session.module';
import { ProstarsWebSuggestedInterviewScheduleModule } from './suggested-interview-schedule/suggested-interview-schedule.module';
import { ProstarsWebInterviewScoreModule } from './interview-score/interview-score.module';
import { ProstarsWebInterviewTemplateModule } from './interview-template/interview-template.module';
import { ProstarsWebContractHistoryModule } from './contract-history/contract-history.module';
import { ProstarsWebBidChangeRequestHistoryModule } from './bid-change-request-history/bid-change-request-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ProstarsWebBizModule,
        ProstarsWebCompanySizeModule,
        ProstarsWebProModule,
        ProstarsWebSkillModule,
        ProstarsWebProjectModule,
        ProstarsWebProRequirementModule,
        ProstarsWebPostModule,
        ProstarsWebSponsorModule,
        ProstarsWebPhoneModule,
        ProstarsWebTitlePrefixModule,
        ProstarsWebBizDelegationModule,
        ProstarsWebFileModule,
        ProstarsWebQuestionModule,
        ProstarsWebSuggestedAnswerModule,
        ProstarsWebPaymentTermModule,
        ProstarsWebInvoiceTermModule,
        ProstarsWebCityModule,
        ProstarsWebStateModule,
        ProstarsWebProRequestModule,
        ProstarsWebMatchReportModule,
        ProstarsWebNotificationModule,
        ProstarsWebRoleMatchProModule,
        ProstarsWebInterviewModule,
        ProstarsWebInterviewSessionModule,
        ProstarsWebSuggestedInterviewScheduleModule,
        ProstarsWebInterviewScoreModule,
        ProstarsWebInterviewTemplateModule,
        ProstarsWebContractHistoryModule,
        ProstarsWebBidChangeRequestHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebEntityModule {}
