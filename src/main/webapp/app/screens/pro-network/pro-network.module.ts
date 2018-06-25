import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from './../../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProNetworkRoutingModule } from './pro-network-routing.module';
import { ProNetworkComponent } from './pro-network.component';
import { ReferralStatusComponent } from './pro-network-referral-status.component';
import { ProNetworkService } from './pro-network.service';

@NgModule({
  imports: [
    FormsModule,
    AngularMultiSelectModule,
    CommonModule,
    RouterModule.forChild(ProNetworkRoutingModule)
  ],
  declarations: [
    ProNetworkComponent,
    ReferralStatusComponent
  ],
  providers: [
    ProNetworkService
],
})
export class ProstarsWebProNetworkModule {}
