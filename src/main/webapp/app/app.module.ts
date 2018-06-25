import { ProstarsWebMatchingModule } from './screens/matching/matching.module';
import { ProstarsWebPostDetailModule } from './screens/post-detail/post-detail.module';
import { ProDetailProfileModule } from './screens/pro-create-account/detail/pro-detail-profile.module';
import { ProSummaryProfileModule } from './screens/pro-create-account/summary/pro-summary-profile.module';
import { BizProfileModule } from './screens/biz-create-account/biz-profile.module';
import './vendor.ts';


import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { ProstarsWebSharedModule, UserRouteAccessService } from './shared';
import { ProstarsWebAppRoutingModule } from './app-routing.module';
import { ProstarsWebHomeModule } from './home/home.module';
import { ProstarsWebDashboardModule } from './screens/dashboard/dashboard.module';
import { ProstarsWebPostsListModule } from './screens/postsList/postsList.module';
import { ProstarsWebAdminModule } from './admin/admin.module';
import { ProstarsWebAccountModule } from './account/account.module';

import { ProstarsWebProNetworkModule } from './screens/pro-network/pro-network.module';
import { ProstarsWebEntityModule } from './entities/entity.module';
import { ProstarsWebSponsorModule } from './screens/sponsor/sponsor.module';
import { ProstarsWebLoginModule } from './screens/login/login.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { ProstarsWebIntroductionModule } from './screens/introduction/introduction.module';

import { ProstarsWebVettingModule } from './screens/vetting/vetting.module';
import { ProstarsWebPostModule } from './screens/post/post.module';
import { ProstarsWebPostsWallModule } from './screens/postWall/postWall.module';
import { ProstarsWebBidModule } from './screens/bid/bid.module'; // [tuanvmn] [Add] Add module Bid 2018/05/11 
import { ProstarsWebDummyModule } from './screens/dummy/dummy.module'; // [tuanvmn] [Add] Add module Dummy 2018/05/16 
import { BizInterviewModule } from './screens/biz-interview/biz-interview.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import { SponsorComponent } from './screens/sponsor/sponsor.component';
import { RoleComponent } from './shared/role/role.component';
import { SkillComponent } from './shared/skill/skill.component';
import { ProDecisionStatusComponent } from './screens/pro-decision-status/pro-decision-status.component';
import { ProDecisionService } from './screens/pro-decision-status/pro-decision-status.service';
import { ProstarsWebContractModule } from './screens/contract/contract.module';
import { BidsManagementModule } from './screens/bids-management/bids-management.module';
import { MatchLandingModule } from './screens/match-landing/match-landing.module';
import { ProstarsWebMatchBidCommonModule } from "./screens/match-bid-common/match-bid-common.module";
import { InterviewModule } from './screens/interview/interview.module';
// import { ProstarsWebChangeRequestBidModule } from './screens/change-request-bid/change-request-bid.module';
import { ChangeRequestBidModalComponent } from './screens/change-request-bid/change-request-bid-modal.component';
import { ChangeRequestBidComponent } from './screens/change-request-bid/change-request-bid.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { loadingInterceptor } from './shared/services/loadingInterceptor';
import { LoadingService } from './shared/services/loader.service';

@NgModule({
    imports: [
        BrowserModule,
        ProstarsWebAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        ProstarsWebSharedModule,
        ProstarsWebHomeModule,
        ProstarsWebAdminModule,
        ProstarsWebAccountModule,
        ProstarsWebProNetworkModule,
        ProstarsWebDashboardModule,
        ProstarsWebIntroductionModule,
        ProstarsWebPostsListModule,
        ProstarsWebLoginModule,
        ProstarsWebSponsorModule,
        ProstarsWebEntityModule,
        ProSummaryProfileModule,
        ProDetailProfileModule,
        BizProfileModule,
        ProstarsWebPostModule,
        ProstarsWebVettingModule,
        ProstarsWebBidModule,
		ProstarsWebDummyModule,
        ProstarsWebPostsWallModule,
        ProstarsWebPostDetailModule,
        BizInterviewModule,
        ProstarsWebContractModule,
        BidsManagementModule,
        MatchLandingModule,
        ProstarsWebMatchBidCommonModule,
        InterviewModule
        // jhipster-needle-angular-add-module JHipster will add new module here    
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        FooterComponent,
        ProDecisionStatusComponent,
    ],
    providers: [
        ProfileService,
        ProDecisionService,
        PaginationConfig,
        LoadingService,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: loadingInterceptor,
            multi: true
        }
    ],
    entryComponents: [ProDecisionStatusComponent],
    bootstrap: [JhiMainComponent]
})
export class ProstarsWebAppModule { }
