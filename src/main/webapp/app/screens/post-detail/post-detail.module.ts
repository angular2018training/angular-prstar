import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProstarsWebSharedModule } from '../../shared';
import { PostDetailComponent } from './post-detail.component';
import { PostDetailService } from './post-detail.service';
import { PostDetailRoute } from './post-detail.route';

const ENTITY_STATES = [
    ...PostDetailRoute
];

@NgModule({
    imports: [
        FormsModule,
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PostDetailComponent
    ],
    entryComponents: [
        PostDetailComponent
    ],
    providers: [
        PostDetailService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebPostDetailModule {}