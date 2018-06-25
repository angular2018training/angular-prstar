import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidsManagementService } from './bids-management.service';
import { BidsManagementRoutingModule } from './bids-management.routing';
import { RolesPage } from './pages/roles/roles.page';

@NgModule({
  imports: [
    CommonModule,
    BidsManagementRoutingModule,
  ],
  declarations: [
    RolesPage,
  ],
  providers: [
    BidsManagementService
  ],
  entryComponents: [
  ],
})
export class BidsManagementModule { }
