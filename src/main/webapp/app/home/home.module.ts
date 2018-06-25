import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProstarsWebSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

import { LoginComponent } from '../screens/login/login.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RecaptchaModule.forRoot(),
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent
    ],
    entryComponents: [
    ],
    providers: [
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: '6LdP2VAUAAAAAGYp7IcIiBlLE__wwlsc99_o0Vsl' } as RecaptchaSettings,
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebHomeModule {}
