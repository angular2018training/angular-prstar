import { BrowserModule } from '@angular/platform-browser';
import { GOOGLE_PLACE_API_KEY } from './../app.constants';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: GOOGLE_PLACE_API_KEY,
            libraries: ["places"]
          }),
        NgbModule.forRoot(),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            i18nEnabled: true,
            defaultI18nLang: 'en'
        }),
        InfiniteScrollModule,
        CookieModule.forRoot()
    ],
    exports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        NgbModule,
        NgJhipsterModule,
        InfiniteScrollModule
    ]
})
export class ProstarsWebSharedLibsModule {}
