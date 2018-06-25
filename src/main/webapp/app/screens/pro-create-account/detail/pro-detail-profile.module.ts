import { MessengerService } from './../../shared/messenger.service';
import { MasterService } from './../../../shared/master/master.service';
import { RECAPCHA_KEY } from './../../../app.constants';
import { ProstarsWebSharedModule } from './../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { AngularMultiSelectModule } from './../../../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';
import { ProDetailProfileComponent } from './pro-detail-profile.component';
import { PRO_DETAIL_PROFILE_ROUTE } from './pro-detail-routing.module'
import { ProDetailSummaryComponent } from './pro-detail-summary.component';
import { ProDetailBioSkillComponent } from './pro-detail-bio-skill.component';
import { ProDetailBackgroundComponent } from './pro-detail-background.component';
import { ProDetailContactComponent } from './pro-detail-contact.component';
import { IndustryService } from '../../../entities/industry/industry.service';

@NgModule({
  imports: [
    ProstarsWebSharedModule,
    CommonModule,
    FormsModule,
    AngularMultiSelectModule,
    RecaptchaModule.forRoot(),
    RouterModule.forChild(PRO_DETAIL_PROFILE_ROUTE)
  ],
  declarations: [
    ProDetailProfileComponent,
    ProDetailContactComponent,
    ProDetailBackgroundComponent,
    ProDetailBioSkillComponent,
    ProDetailSummaryComponent
  ],
  providers: [
    {
        provide: RECAPTCHA_SETTINGS,
        useValue: { siteKey: RECAPCHA_KEY } as RecaptchaSettings,
    },
    MasterService,
    MessengerService,
    IndustryService
  ]
})
export class ProDetailProfileModule { }
