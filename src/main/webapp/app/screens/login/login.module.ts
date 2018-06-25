import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

import { loginRoute } from './login.route';
import { ProstarsWebSharedModule } from '../../shared';
import { LoginComponent } from './login.component';
import { RECAPCHA_KEY } from './../../app.constants';

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild([ loginRoute ]),
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule
    ],
    declarations: [
        LoginComponent
    ],
    entryComponents: [
    ],
    providers: [
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: RECAPCHA_KEY } as RecaptchaSettings,
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebLoginModule {}
