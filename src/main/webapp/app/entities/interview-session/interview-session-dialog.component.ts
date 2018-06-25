import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InterviewSession } from './interview-session.model';
import { InterviewSessionPopupService } from './interview-session-popup.service';
import { InterviewSessionService } from './interview-session.service';
import { Interview, InterviewService } from '../interview';

@Component({
    selector: 'jhi-interview-session-dialog',
    templateUrl: './interview-session-dialog.component.html'
})
export class InterviewSessionDialogComponent implements OnInit {

    interviewSession: InterviewSession;
    isSaving: boolean;

    interviews: Interview[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private interviewSessionService: InterviewSessionService,
        private interviewService: InterviewService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.interviewService.query()
            .subscribe((res: HttpResponse<Interview[]>) => { this.interviews = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.interviewSession.id !== undefined) {
            this.subscribeToSaveResponse(
                this.interviewSessionService.update(this.interviewSession));
        } else {
            this.subscribeToSaveResponse(
                this.interviewSessionService.create(this.interviewSession));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InterviewSession>>) {
        result.subscribe((res: HttpResponse<InterviewSession>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InterviewSession) {
        this.eventManager.broadcast({ name: 'interviewSessionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInterviewById(index: number, item: Interview) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-interview-session-popup',
    template: ''
})
export class InterviewSessionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interviewSessionPopupService: InterviewSessionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.interviewSessionPopupService
                    .open(InterviewSessionDialogComponent as Component, params['id']);
            } else {
                this.interviewSessionPopupService
                    .open(InterviewSessionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
