import {Routes} from "@angular/router";
import {ProjectComponent, ProofPostComponent, ProRequestComponent} from "./";
import {CreatePostComponent} from "./create-post/create-post.component"
import { UserRouteAccessService } from '../../shared';

export const PostRoute: Routes = [
    {
        path: 'create-post',
        component: CreatePostComponent,
        data: {
            authorities:  ['ROLE_BIZ'],
            pageTitle: 'prostarsWebApp.post.home.title',
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                redirectTo: 'project',
                pathMatch: 'full'
            },
            {
                path: 'project',
                component: ProjectComponent,
                data: {
                    authorities: ['ROLE_BIZ'],
                    pageTitle: 'prostarsWebApp.introduction.home.title.isPro'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'proof-post',
                component: ProofPostComponent,
                data: {
                    authorities: ['ROLE_BIZ'],
                    pageTitle: 'prostarsWebApp.introduction.home.title.isPro'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'pro-request',
                component: ProRequestComponent,
                data: {
                    authorities: ['ROLE_BIZ'],
                    pageTitle: 'prostarsWebApp.introduction.home.title.isPro'
                },
                canActivate: [UserRouteAccessService]
            },
        ]
    },
    {
        path: 'create-pro-request',
        component: CreatePostComponent,
        data: {
            authorities:  ['ROLE_BIZ'],
            pageTitle: 'prostarsWebApp.post.home.title',
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                redirectTo: 'project',
                pathMatch: 'full'
            },
            {
                path: 'project',
                component: ProjectComponent,
                data: {
                    authorities: ['ROLE_BIZ'],
                    pageTitle: 'prostarsWebApp.introduction.home.title.isPro'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'proof-post',
                component: ProofPostComponent,
                data: {
                    authorities: ['ROLE_BIZ'],
                    pageTitle: 'prostarsWebApp.introduction.home.title.isPro'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'pro-request',
                component: ProRequestComponent,
                data: {
                    authorities: ['ROLE_BIZ'],
                    pageTitle: 'prostarsWebApp.introduction.home.title.isPro'
                },
                canActivate: [UserRouteAccessService]
            },
        ]
    }
];
