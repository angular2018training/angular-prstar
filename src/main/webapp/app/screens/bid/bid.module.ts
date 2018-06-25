import { BidUpdateComponent } from './update-bid/bid-update.component';
import { BidDetailComponent } from './bid-detail/bid-detail.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import {RatingModule} from "ngx-rating";
import { GOOGLE_MAP_API_URL } from './../../app.constants';
import { NguiMapModule } from '@ngui/map';

import { ProstarsWebSharedModule } from '../../shared';
import {
    BidService,
    BidRoute,
    BidNewComponent,
    BidSuccessComponent
} from './';

const ENTITY_STATES = [
    ...BidRoute,
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        CurrencyMaskModule,
        RatingModule,
        NguiMapModule.forRoot({apiUrl: GOOGLE_MAP_API_URL})
    ],
    declarations: [
        BidNewComponent,
        BidSuccessComponent,
        BidDetailComponent,
        BidUpdateComponent
    ],
    entryComponents: [
        BidNewComponent,
        BidSuccessComponent,
        BidDetailComponent,
        BidUpdateComponent
    ],
    providers: [
        BidService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebBidModule {}
