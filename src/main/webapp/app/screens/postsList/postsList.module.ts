import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import {
    PostsListComponent,
    PostsListService,
    PostsListRoute
} from './';

const ENTITY_STATES = [
    ...PostsListRoute
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PostsListComponent
    ],
    entryComponents: [
        PostsListComponent
    ],
    providers: [
        PostsListService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebPostsListModule {}
