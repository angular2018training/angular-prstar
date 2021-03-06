import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Interview } from './interview.model';
import { InterviewPopupService } from './interview-popup.service';
import { InterviewService } from './interview.service';

@Component({
    selector: 'jhi-interview-dialog',
    templateUrl: './interview-dialog.component.html'
})
export class InterviewDialogComponent implements OnInit {

    interview: Interview;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private interviewService: InterviewService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.interview.id !== undefined) {
            this.subscribeToSaveResponse(
                this.interviewService.update(this.interview));
        } else {
            this.subscribeToSaveResponse(
                this.interviewService.create(this.interview));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Interview>>) {
        result.subscribe((res: HttpResponse<Interview>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Interview) {
        this.eventManager.broadcast({ name: 'interviewListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-interview-popup',
    template: ''
})
export class InterviewPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interviewPopupService: InterviewPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.interviewPopupService
                    .open(InterviewDialogComponent as Component, params['id']);
            } else {
                this.interviewPopupService
                    .open(InterviewDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
