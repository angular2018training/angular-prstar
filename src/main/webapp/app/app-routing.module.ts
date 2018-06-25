import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { sponsorRoute } from './screens/sponsor/sponsor.route';
import { DEBUG_INFO_ENABLED } from './app.constants';

const LAYOUT_ROUTES = [
    navbarRoute,
    sponsorRoute,
    ...errorRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true , enableTracing: false })
    ],
    exports: [
        RouterModule
    ]
})
export class ProstarsWebAppRoutingModule {}
