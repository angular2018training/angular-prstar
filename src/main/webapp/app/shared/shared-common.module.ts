import { AddressComponent } from './autocomplete-address/address.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';
import { AngularMultiSelectModule } from './../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';
import {ModalDialogComponent} from '../shared/dialog/modal-dialog.component';
import {ModalDialogService} from '../shared/dialog/modal-dialog.service';

import {
    ProstarsWebSharedLibsModule,
    JhiLanguageHelper,
    SkillComponent,
    RoleComponent,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    ScheduleTimeComponent,
    ScheduleDateComponent
} from './';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

@NgModule({
    imports: [
        ProstarsWebSharedLibsModule,
        AngularMultiSelectModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        SkillComponent,
        RoleComponent,
        AddressComponent,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        ModalDialogComponent,
        ScheduleTimeComponent,
        ScheduleDateComponent,
        DoughnutChartComponent
    ],
    entryComponents: [
        ModalDialogComponent,
        ScheduleTimeComponent,
        ScheduleDateComponent
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
        ModalDialogService
    ],
    exports: [
        ProstarsWebSharedLibsModule,
        FindLanguageFromKeyPipe,
        SkillComponent,
        RoleComponent,
        AddressComponent,
        JhiAlertComponent,
        ScheduleTimeComponent,
        ScheduleDateComponent,
        DoughnutChartComponent
    ]
})
export class ProstarsWebSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
