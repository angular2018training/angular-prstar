import { Owner } from './../../screens/bid/bid.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Principal, LoginService }  from '../../shared';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageHelper } from '../../shared';
declare var window: any;
import * as $ from "jquery";
import { ProDecisionService } from '../../screens/pro-decision-status/pro-decision-status.service';
import { LoadingService } from '../../shared/services/loader.service';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class JhiMainComponent implements OnInit {
    backgroundData = {
        avatarPhoto: '',
        avatarPhotoContentType: ''
    };
    isColorLogo = false;

    collapsed = true;

    whiteLogoPages = [
        "/","/login","/reset/request","/reset/finish"
    ]

    showDashboardMenu = false;

    modalRef: NgbModalRef;

    firstName = '';
    companyName = '';
    proRes: any;
    ownerRating: number = 4.5;
    pro: Owner;

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private loginService: LoginService,
        private principal: Principal,
        private decisionService: ProDecisionService,
        public loaderService: LoadingService
    ) {
        this.router.events.subscribe((val) =>{
            this.isColorLogo = !this.whiteLogoPages.includes(this.router.url);
        })
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'prostarsWebApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngDoCheck() {
        if(sessionStorage.getItem('prostart_accout')) {
            let account = JSON.parse(sessionStorage.getItem('prostart_accout'));
            this.companyName = account.companyName;
            this.firstName = account.firstName;
            this.backgroundData.avatarPhoto = account.avatar;
            this.backgroundData.avatarPhotoContentType = account.contentType;
        }
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            
            if (event instanceof NavigationEnd) {
                process.nextTick(()=>{
                    this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root)); 
                })
            }
        });
    }

    goHome() {
        this.showDashboardMenu = false;
        this.router.navigate(['']);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
        
    }

    logout() {
        this.loginService.logout();
        // TODO        
        let currentURL = window.location.href;
        let childIndex = currentURL.indexOf("/");
        if (childIndex != -1) {
            window.location.href=currentURL.substring(0, childIndex);
        } else {
           window.location.reload(true);    
        }
        
        $("body").css("cursor", "wait");
        sessionStorage.removeItem('prostart_accout');
    }

    toggleMenu () {
        this.collapsed = !this.collapsed;
    }

    isCollapsed() {
        return this.collapsed; 
    }

    proDecisionStatus() {        
        this.modalRef = this.decisionService.open(); 
    }
}
