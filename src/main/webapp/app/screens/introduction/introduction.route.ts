import { Routes } from '@angular/router';

import {
    IntroductionComponent,
    IncomeCalculatorComponent,
    HowToJoinComponent,
    LearnMoreComponent
} from './';
import {BizIntroComponent} from './biz-intro/biz-intro.component';

export const IntroductionRoute: Routes = [
    {
        path: 'introduction',
        component: IntroductionComponent,
        data: {
            authorities: [],
            pageTitle: 'prostarsWebApp.introduction.home.title'
        },
        children: [
            {
                path: '',
                component: LearnMoreComponent,
                data: {
                    authorities: [],
                    pageTitle: 'prostarsWebApp.introduction.home.title.isPro'
                }
            },
            {
                path: 'biz',
                component: BizIntroComponent,
                data: {
                    authorities: [],
                    pageTitle: 'prostarsWebApp.introduction.home.title.isBiz'
                }
            },
            {
                path: 'income-calculator',
                component: IncomeCalculatorComponent,
                data: {
                    authorities: [],
                    pageTitle: 'prostarsWebApp.introduction.incomeCalculator.title.isPro'
                }
            },
            {
                path: 'how-to-join',
                component: HowToJoinComponent,
                data: {
                    authorities: [],
                    pageTitle: 'prostarsWebApp.introduction.howToJoin.title.isPro'
                }
            }
        ]
    }
];
