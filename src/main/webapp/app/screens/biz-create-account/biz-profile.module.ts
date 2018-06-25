import { ProstarsWebSharedModule, UserService } from './../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RECAPCHA_KEY } from './../../app.constants';
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';
import { BizProfileSummaryComponent } from './biz-profile-summary.component';
import { BizProfileContractsComponent } from './biz-profile-contracts.component';
import { BizProfileCompanyBioComponent } from './biz-profile-company-bio.component';
import { BizProfileKeyRolesComponent } from './biz-profile-key-roles.component';
import { BizProfileContactComponent } from './biz-profile-contact.component';
import { BizInfoPlanningComponent } from './biz-info-planning.component';
import { RouterModule } from '@angular/router';
import { BizProfileComponent } from './biz-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BizProfileRoute } from './biz-profile.route';
import { BizService } from '../../entities/biz';
import { BrowserModule } from '@angular/platform-browser';
import { MessengerService } from '../shared/messenger.service';
import { BizProfileModalService } from './biz-profile-modal.service';
import { BizProfileResultComponent } from './biz-profile-result.component';
import { BizCheckEmailComponent } from './biz-check-email.component';
import { BizSummarySuccessComponent } from './biz-summary-success.component';
import { AngularMultiSelectModule } from './../../shared/angular2-multiselect-dropdown-custom';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ProstarsWebSharedModule,
    CommonModule,
    FormsModule,
    AngularMultiSelectModule,
    RouterModule.forChild(BizProfileRoute),
    RecaptchaModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    BizProfileComponent,
    BizInfoPlanningComponent,
    BizProfileContactComponent,
    BizProfileKeyRolesComponent,
    BizProfileCompanyBioComponent,
    BizProfileContractsComponent,
    BizProfileSummaryComponent,
    BizProfileResultComponent,
    BizCheckEmailComponent,
    BizSummarySuccessComponent
  ],
  entryComponents: [
    BizProfileResultComponent,
    BizCheckEmailComponent,
    BizSummarySuccessComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: RECAPCHA_KEY } as RecaptchaSettings,
    },
    BizService,
    UserService,
    BizProfileModalService,
    MessengerService
  ]
})
export class BizProfileModule { }
