import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InterviewScore } from './interview-score.model';
import { InterviewScoreService } from './interview-score.service';

@Component({
    selector: 'jhi-interview-score-detail',
    templateUrl: './interview-score-detail.component.html'
})
export class InterviewScoreDetailComponent implements OnInit, OnDestroy {

    interviewScore: InterviewScore;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private interviewScoreService: InterviewScoreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInterviewScores();
    }

    load(id) {
        this.interviewScoreService.find(id)
            .subscribe((interviewScoreResponse: HttpResponse<InterviewScore>) => {
                this.interviewScore = interviewScoreResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInterviewScores() {
        this.eventSubscriber = this.eventManager.subscribe(
            'interviewScoreListModification',
            (response) => this.load(this.interviewScore.id)
        );
    }
}
