import { CommonModule } from '@angular/common';
import { InviteeService } from './../../entities/invitee/invitee.service';
import { SponsorComponent } from './sponsor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule} from '@angular/core';

@NgModule({
    imports: [
        FormsModule, CommonModule
    ],
    declarations: [SponsorComponent],
    providers: [
        InviteeService
    ]
})
export class ProstarsWebSponsorModule {}