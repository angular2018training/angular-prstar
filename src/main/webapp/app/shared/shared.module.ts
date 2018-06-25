import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    ProstarsWebSharedLibsModule,
    ProstarsWebSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    MasterService,
    StateStorageService,
    LoginService,
    Principal,
    HasAnyAuthorityDirective,
} from './';


@NgModule({
    imports: [
        ProstarsWebSharedLibsModule,
        ProstarsWebSharedCommonModule
    ],
    declarations: [
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        AccountService,
        StateStorageService,
        Principal,
        MasterService,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [],
    exports: [
        ProstarsWebSharedCommonModule,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ProstarsWebSharedModule {}
