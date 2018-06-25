import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { VettingComponent } from './vetting.component';
import {ApplicantDetailComponent} from './applicant-detail/applicant-detail.component'
import { VettingRoute } from './vetting.route';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VettingService } from './vetting.service';
import { ProstarsWebSharedModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProstarsWebSharedModule,
        RouterModule.forChild(VettingRoute)
    ],
    declarations: [
        VettingComponent,
        ApplicantDetailComponent
    ],
    entryComponents: [
        ApplicantDetailComponent
    ],
    providers: [
        VettingService
    ]
})
export class ProstarsWebVettingModule { }