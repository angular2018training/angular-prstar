import { ActivatedRoute } from '@angular/router';
import { ProService } from './../../../entities/pro/pro.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {IntroductionService} from '../';

@Component({
    selector: 'jhi-learn-more',
    templateUrl: 'learn-more.component.html',
})
export class LearnMoreComponent implements OnInit, OnDestroy {
    // Information of the invitee.
    invitee: any;

    // Share service.
    inviteeSub: any;

    constructor(
        private introductionService: IntroductionService,
        private proService: ProService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        /**
         * Get information of the invitee in share service of Introduction.
         */
        this.inviteeSub = this.introductionService.getInvitee().subscribe((invitee) => {
            this.invitee = invitee;
        });
    }

    ngOnDestroy(): void {
        if (this.inviteeSub) {
            this.inviteeSub.unsubscribe();
        }
    }

}
