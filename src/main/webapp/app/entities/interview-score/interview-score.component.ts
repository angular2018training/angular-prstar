import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InterviewScore } from './interview-score.model';
import { InterviewScoreService } from './interview-score.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-interview-score',
    templateUrl: './interview-score.component.html'
})
export class InterviewScoreComponent implements OnInit, OnDestroy {
interviewScores: InterviewScore[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private interviewScoreService: InterviewScoreService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.interviewScoreService.query().subscribe(
            (res: HttpResponse<InterviewScore[]>) => {
                this.interviewScores = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInterviewScores();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: InterviewScore) {
        return item.id;
    }
    registerChangeInInterviewScores() {
        this.eventSubscriber = this.eventManager.subscribe('interviewScoreListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
