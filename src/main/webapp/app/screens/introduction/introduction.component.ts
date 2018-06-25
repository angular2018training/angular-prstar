import { Component, OnInit } from '@angular/core';
import { ProStarsVideoComponent } from './';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProService } from '../../entities/pro/pro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Invitee } from '../../shared';
import { TOKEN } from '../../app.constants';
import { IntroductionService } from './';

@Component({
    selector: 'jhi-introduction',
    templateUrl: 'introduction.component.html',
    styleUrls: [
        'introduction.scss'
    ]
})
export class IntroductionComponent implements OnInit {

    // This variable is used to display buttons on GUI
    private isBiz = false;

    private isLearnMorePage = false;

    constructor(
        private modalService: NgbModal,
        private proService: ProService,
        private router: Router,
        private route: ActivatedRoute,
        private introductionService: IntroductionService
    ) {
        this.router.events.subscribe((val) =>{
            // Check whether user want to register as a Pro or Biz 
            this.isBiz = this.router.url.indexOf('biz') >= 0;
            // It is used to display Introdution page.
            this.isLearnMorePage = this.router.url === '/introduction';
        })
    }

    ngOnInit() {
        /**
         * Handle for Registering a PRO.
         */
        if (!this.isBiz) {
            // Get Toke from URL and load information of Invitee.
            const subRoute = this.route.queryParams.subscribe( (params) => {
                // Get token which is send in email.
                const token = params[TOKEN];
                if (token) {
                    // Get invitee information based on token.
                    const subInvitee = this.proService.inviteeInformation(token).subscribe((inviteeResponse: HttpResponse<Invitee>) => {
                        this.introductionService.setInvitee(inviteeResponse.body);
                        subInvitee.unsubscribe();
                    });
                }
            });
        }
    }

    /**
     * Handle for ProStarsVideo button
     */
    showProStarsVideo() {
        this.modalService.open(ProStarsVideoComponent, { size: 'lg', windowClass: 'animated slideInUp'});
    }
}
