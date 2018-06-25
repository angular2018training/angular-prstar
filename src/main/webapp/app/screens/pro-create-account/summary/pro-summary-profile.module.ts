import { MessengerService } from './../../shared/messenger.service';
import { MasterService } from './../../../shared/master/master.service';
import { RECAPCHA_KEY } from './../../../app.constants';
import { ProstarsWebSharedModule } from './../../../shared/shared.module';
import { ProSummaryProfileComponent } from './pro-summary-profile.component';
import { ProSummaryBioComponent } from './pro-summary-bio.component';
import { ProCreateAccountComponent } from './pro-create-account.component';
import { PRO_SUMMARY_PROFILE_ROUTE } from './pro-summary-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { ProSummaryProfileSummaryComponent } from './pro-summary-profile-summary.component';
import { ProSummaryProfileSkillComponent } from './pro-summary-profile-skill.component';
import { AngularMultiSelectModule } from './../../../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';

@NgModule({
  imports: [
    ProstarsWebSharedModule,
    CommonModule,
    FormsModule,
    AngularMultiSelectModule,
    RecaptchaModule.forRoot(),
    RouterModule.forChild(PRO_SUMMARY_PROFILE_ROUTE)
  ],
  declarations: [
    ProCreateAccountComponent,
    ProSummaryBioComponent,
    ProSummaryProfileComponent,
    ProSummaryProfileSkillComponent,
    ProSummaryProfileSummaryComponent
  ],
  providers: [
    {
        provide: RECAPTCHA_SETTINGS,
        useValue: { siteKey: RECAPCHA_KEY } as RecaptchaSettings,
    },
    MasterService,
    MessengerService
  ]
})
export class ProSummaryProfileModule { }
