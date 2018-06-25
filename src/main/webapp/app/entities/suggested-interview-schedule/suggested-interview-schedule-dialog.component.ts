import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SuggestedInterviewSchedule } from './suggested-interview-schedule.model';
import { SuggestedInterviewSchedulePopupService } from './suggested-interview-schedule-popup.service';
import { SuggestedInterviewScheduleService } from './suggested-interview-schedule.service';
import { InterviewSession, InterviewSessionService } from '../interview-session';

@Component({
    selector: 'jhi-suggested-interview-schedule-dialog',
    templateUrl: './suggested-interview-schedule-dialog.component.html'
})
export class SuggestedInterviewScheduleDialogComponent implements OnInit {

    suggestedInterviewSchedule: SuggestedInterviewSchedule;
    isSaving: boolean;

    interviewsessions: InterviewSession[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private suggestedInterviewScheduleService: SuggestedInterviewScheduleService,
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
        if (this.suggestedInterviewSchedule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.suggestedInterviewScheduleService.update(this.suggestedInterviewSchedule));
        } else {
            this.subscribeToSaveResponse(
                this.suggestedInterviewScheduleService.create(this.suggestedInterviewSchedule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SuggestedInterviewSchedule>>) {
        result.subscribe((res: HttpResponse<SuggestedInterviewSchedule>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SuggestedInterviewSchedule) {
        this.eventManager.broadcast({ name: 'suggestedInterviewScheduleListModification', content: 'OK'});
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
    selector: 'jhi-suggested-interview-schedule-popup',
    template: ''
})
export class SuggestedInterviewSchedulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private suggestedInterviewSchedulePopupService: SuggestedInterviewSchedulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.suggestedInterviewSchedulePopupService
                    .open(SuggestedInterviewScheduleDialogComponent as Component, params['id']);
            } else {
                this.suggestedInterviewSchedulePopupService
                    .open(SuggestedInterviewScheduleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
