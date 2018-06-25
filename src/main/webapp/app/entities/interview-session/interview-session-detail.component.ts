import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InterviewSession } from './interview-session.model';
import { InterviewSessionService } from './interview-session.service';

@Component({
    selector: 'jhi-interview-session-detail',
    templateUrl: './interview-session-detail.component.html'
})
export class InterviewSessionDetailComponent implements OnInit, OnDestroy {

    interviewSession: InterviewSession;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private interviewSessionService: InterviewSessionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInterviewSessions();
    }

    load(id) {
        this.interviewSessionService.find(id)
            .subscribe((interviewSessionResponse: HttpResponse<InterviewSession>) => {
                this.interviewSession = interviewSessionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInterviewSessions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'interviewSessionListModification',
            (response) => this.load(this.interviewSession.id)
        );
    }
}
