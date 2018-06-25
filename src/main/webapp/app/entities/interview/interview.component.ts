import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Interview } from './interview.model';
import { InterviewService } from './interview.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-interview',
    templateUrl: './interview.component.html'
})
export class InterviewComponent implements OnInit, OnDestroy {
interviews: Interview[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private interviewService: InterviewService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.interviewService.query().subscribe(
            (res: HttpResponse<Interview[]>) => {
                this.interviews = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInterviews();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Interview) {
        return item.id;
    }
    registerChangeInInterviews() {
        this.eventSubscriber = this.eventManager.subscribe('interviewListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
