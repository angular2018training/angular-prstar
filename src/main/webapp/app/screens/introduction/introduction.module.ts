import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProstarsWebSharedModule } from '../../shared';
import { IntroductionRoute,
    IntroductionComponent,
    ProStarsVideoComponent,
    IncomeCalculatorComponent,
    LearnMoreComponent,
    BizIntroComponent,
    IntroductionService,
    HowToJoinComponent
} from './';

const ENTITY_STATES = [
    ...IntroductionRoute
];

@NgModule({
    imports: [
        ProstarsWebSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IntroductionComponent,
        ProStarsVideoComponent,
        IncomeCalculatorComponent,
        BizIntroComponent,
        LearnMoreComponent,
        HowToJoinComponent
    ],
    entryComponents: [
        IntroductionComponent,
        ProStarsVideoComponent,
        LearnMoreComponent,
        BizIntroComponent,
        IncomeCalculatorComponent,
        HowToJoinComponent
    ],
    providers: [
        IntroductionService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProstarsWebIntroductionModule {}
