import { InviteeService } from './../../../entities/invitee/invitee.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {IntroductionService} from '../';
import {UserService} from '../../../shared';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-how-to-join',
    templateUrl: 'how-to-join.component.html',
})
export class HowToJoinComponent implements OnInit, OnDestroy {
    // Information of the invitee.
    invitee: any;

    // Subscribe to get invitee information from share service.
    subInvitee: any;

    // This value is used to show/hide email error message.
    showErrorMessage = false;

    /**
     * Constructor
     */
    constructor(
        private introductionService: IntroductionService,
        private userService: UserService,
        private jhiAlertService: JhiAlertService,
        private route: Router,
        private inviteeService: InviteeService
    ) {

    }

    /**
     * The method is called when user click on button 'Create a Summary Profile'.
     * If user has referrals link, navigate to screen 'Create a Summary Profile'.
     * If user does not have referrals link, checking email existed or not before
     * navigate to the next screen.
     *    + If email is existed, navigate to screen 'Create a Summary Profile'.
     *    + Else, show alert.
     */
    createSummaryProfile() {

        if (!this.invitee.id) {
             /**
             * Handle for user without referrals link.
             */
            if (this.invitee.inviterEmail) {
                // Check existed email in ProStars DB.
                const subEmail = this.userService.findByEmail(this.invitee.inviterEmail).subscribe((isExisted) => {

                    if (isExisted) {
                        // Navigate to create profile if email is valid.
                        this.route.navigateByUrl('/pro-create-summary?inviterEmail='+ this.invitee.inviterEmail);
                    } else {
                        // Show alert if pro with email does not exist.
                        this.showErrorMessage = true;
                    }

                    subEmail.unsubscribe();
                }, (res: HttpErrorResponse) => this.onError(res.message));
            } else {
                // If user does not input email => naviagate to 'Create a Summary Profile' without params
                this.route.navigateByUrl('/pro-create-summary');
            }
        } else {
            /**
             * Handle for user with referrals link.
             */
            let paramString1 = this.invitee.inviter.account.login ? ('?inviterEmail=' + this.invitee.inviter.account.login) : '';
            let paramString2 = this.invitee.email ? ('&inviteeEmail=' + this.invitee.email) : '';
            const paramString = paramString1 + paramString2;
            this.route.navigateByUrl('/pro-create-summary' + paramString);
        }
    }

    private onError(error: string) {
        this.jhiAlertService.error(error, null, null);
    }

    ngOnInit() {
        /**
         * Get information of the invitee in share service of Introduction.
         */
        this.subInvitee = this.introductionService.getInvitee().subscribe((invitee) => {
            this.invitee = invitee;
        });
    }

    ngOnDestroy(): void {
        if (this.subInvitee) {
            this.subInvitee.unsubscribe();
        }
    }
}
