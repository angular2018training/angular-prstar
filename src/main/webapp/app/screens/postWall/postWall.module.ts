import { AngularMultiSelectModule } from './../../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../../shared';
import { PostWallComponent } from './postWall.component';
import { PostWallService } from './postWall.service';
import { PostWallRoute } from './postWall.route';

const ENTITY_STATES = [
    ...PostWallRoute
];

@NgModule({
    imports: [
        FormsModule,
        AngularMultiSelectModule,
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PostWallComponent
    ],
    entryComponents: [
        PostWallComponent
    ],
    providers: [
        PostWallService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebPostsWallModule {}