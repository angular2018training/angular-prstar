import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InterviewSession } from './interview-session.model';
import { InterviewSessionService } from './interview-session.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-interview-session',
    templateUrl: './interview-session.component.html'
})
export class InterviewSessionComponent implements OnInit, OnDestroy {
interviewSessions: InterviewSession[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private interviewSessionService: InterviewSessionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.interviewSessionService.query().subscribe(
            (res: HttpResponse<InterviewSession[]>) => {
                this.interviewSessions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInterviewSessions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: InterviewSession) {
        return item.id;
    }
    registerChangeInInterviewSessions() {
        this.eventSubscriber = this.eventManager.subscribe('interviewSessionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
