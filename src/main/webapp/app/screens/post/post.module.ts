import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from './../../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';

import { MatchingService } from './../matching/matching.service';
import { PostResultComponent } from './create-post/post-result.component';
import { PostModalService } from './create-post/post-modal.service';
import { ProstarsWebSharedModule } from '../../shared';
import {
    CreatePostComponent,
    ProofPostComponent,
    ProRequestComponent,
    CreatePostService,
    ProjectComponent,
} from './create-post';
import { PostRoute } from "./post.route";
import { PostService } from './post.service';
import { ProRequestService } from './pro-request.service';

const ENTITY_STATES = [
    ...PostRoute
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        FormsModule,
        RouterModule.forChild(ENTITY_STATES),
        AngularMultiSelectModule
    ],
    declarations: [
        CreatePostComponent,
        ProofPostComponent,
        ProRequestComponent,
        ProjectComponent,
        PostResultComponent
    ],
    entryComponents: [
        PostResultComponent,
        CreatePostComponent,
        ProofPostComponent,
        ProRequestComponent,
        ProjectComponent,
    ],
    providers: [
        CreatePostService,
        PostService,
        PostModalService,
        ProRequestService,
        MatchingService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebPostModule { }
