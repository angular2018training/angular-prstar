import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from "@angular/common";

import { Account, Principal, LoginService } from '../../shared';
import { Biz, BizService } from "../../entities/biz";
import { JhiEventManager } from 'ng-jhipster';
import { MatchingService } from './../matching/matching.service';
import { MatchReport } from './../../entities/match-report/match-report.model';
import { Bid, BidService } from '../bid';
import { Notification} from '../../entities/notification/notification.model';
import { DashboardService } from './dashboard.service';
import { ProDashboard } from './dashboard.model';
declare var window: any;

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        'dashboard.scss'
    ]

})
export class DashboardComponent implements OnInit, AfterViewInit {
    account: Account;
    modalRef: NgbModalRef;
    isProUser = false;
    isBizUser = false;
    prodashboardDTO: ProDashboard;
    notificationList: Notification[];
    bidsSumitted: Bid[];
    bidsSaved: Bid[];
    bidSummitedCount: number = 2;
    bidSavedCount: number = 0;

    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private bizService: BizService,
        private loginService: LoginService,
        private router: Router,
        private bidService: BidService,
        private dashboardService: DashboardService,
        private datePipe: DatePipe,
        private matchingService: MatchingService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;

            // Check is Pro User
            this.isProUser = this.account.authorities.find((role) => {
                return role === 'ROLE_PRO';
            }) != null;
            // Check biz user
            this.isBizUser = this.account.authorities.find((role) => {
                return role === 'ROLE_BIZ';
            }) != null;
        });
        this.registerAuthenticationSuccess();

        this.route.queryParams.subscribe((params) => {
            console.log('activationKey: ' + params['activation_key']);
            if (params['activation_key']) {
                this.bizService.findByActivationKey(params['activation_key'])
                .subscribe((bizResponse: HttpResponse<Biz>) => {
                    this.bizService.biz = bizResponse.body;
                    console.log('biz: ' + this.bizService.biz.user);
                    // login with JWT
                    this.loginService.loginWithToken(this.bizService.biz.jwtToken.id_token, true)
                      .then(() => {
                        this.bizService.biz.jwtToken = null;
                        // Go to dashboard screen after forcing log in
                        this.router.navigate(['dashboard']);
                      });
                });
            }
        });

        this.dashboardService.getAll().subscribe(
            (res: HttpResponse<ProDashboard>) => {
                console.log(res.body);
                this.prodashboardDTO = res.body;
                this.notificationList = this.prodashboardDTO.lstNotifications;
                this.bidSummitedCount = this.prodashboardDTO.bidSubmitted;
                
                // Sort
                this.notificationList = this.notificationList.sort( (n1, n2) => {
                    if (n1.createdDate < n2.createdDate) {
                        return 1;
                    }
                    if (n1.createdDate > n2.createdDate) {
                        return -1;
                    }
                    return 0;
                });

                for (let i = 0; i < this.notificationList.length; i++) {
                    this.notificationList[i].createdDate = this.datePipe.transform(Date.parse(this.notificationList[i].createdDate), "MMMM d, y, h:mm a");
                }
            }
        );
    }

    ngAfterViewInit() {
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    login() {
        this.router.navigate(['/login']);
    }
}
