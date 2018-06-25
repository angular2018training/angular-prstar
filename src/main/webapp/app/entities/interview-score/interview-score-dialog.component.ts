import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InterviewScore } from './interview-score.model';
import { InterviewScorePopupService } from './interview-score-popup.service';
import { InterviewScoreService } from './interview-score.service';
import { InterviewSession, InterviewSessionService } from '../interview-session';

@Component({
    selector: 'jhi-interview-score-dialog',
    templateUrl: './interview-score-dialog.component.html'
})
export class InterviewScoreDialogComponent implements OnInit {

    interviewScore: InterviewScore;
    isSaving: boolean;

    interviewsessions: InterviewSession[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private interviewScoreService: InterviewScoreService,
        private interviewSessionService: InterviewSessionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.interviewSessionService.query()
            .subscribe((res: HttpResponse<InterviewSession[]>) => { this.interviewsessions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.interviewScore.id !== undefined) {
            this.subscribeToSaveResponse(
                this.interviewScoreService.update(this.interviewScore));
        } else {
            this.subscribeToSaveResponse(
                this.interviewScoreService.create(this.interviewScore));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InterviewScore>>) {
        result.subscribe((res: HttpResponse<InterviewScore>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InterviewScore) {
        this.eventManager.broadcast({ name: 'interviewScoreListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInterviewSessionById(index: number, item: InterviewSession) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-interview-score-popup',
    template: ''
})
export class InterviewScorePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interviewScorePopupService: InterviewScorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.interviewScorePopupService
                    .open(InterviewScoreDialogComponent as Component, params['id']);
            } else {
                this.interviewScorePopupService
                    .open(InterviewScoreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
