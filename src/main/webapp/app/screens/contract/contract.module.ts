import { AngularMultiSelectModule } from './../../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContractRoute } from './contract.route';
import { ContractTemplateComponent } from '../contract/contract-template/contract-template.component';
import { ContractDetailComponent } from '../contract/contract-pending/contract-detail.component';
import { ContractPopupComponent } from '../contract/contract-pending/contract-popup.component';
import { ContractCompletedComponent } from '../contract/contract-completed/contract-completed.component';
import { ContractStatusComponent } from '../contract/contract-completed/contract-status.component';
import { ContractPendingComponent } from '../contract/contract-pending/contract-peding.component';
import { ContractEditPopupComponent } from '../contract/contract-pending/contract-edit-popup.component';

import { ProstarsWebSharedModule, UserService } from '../../shared';
import { ContractTemplateService } from '../contract/contract-template/contract-template.service';
import { ContractService } from './contract.service';
import { RoleService } from '../../shared/role/role.service';
import { ContractTemplatePopupComponent } from '../contract/contract-template/contract-template-popup.component';
import { ContractHistoryService } from '../contract/contract-pending/contract-history.service';

@NgModule({
    imports: [
        FormsModule,
        AngularMultiSelectModule,
        ProstarsWebSharedModule,
        RouterModule.forChild(ContractRoute)
    ],
    declarations: [
        ContractTemplateComponent,
        ContractDetailComponent,
        ContractPopupComponent,
        ContractCompletedComponent,
        ContractPendingComponent,
        ContractTemplatePopupComponent,
        ContractEditPopupComponent,
        ContractStatusComponent,        
    ],
    entryComponents: [
       ContractTemplateComponent,
       ContractDetailComponent,
       ContractPopupComponent,
       ContractTemplatePopupComponent,
       ContractEditPopupComponent,       
    ],
    providers: [
        ContractService,
        ContractTemplateService,
        RoleService,
        UserService,
        ContractHistoryService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebContractModule {}