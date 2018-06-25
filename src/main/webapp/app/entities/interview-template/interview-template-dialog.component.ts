import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InterviewTemplate } from './interview-template.model';
import { InterviewTemplatePopupService } from './interview-template-popup.service';
import { InterviewTemplateService } from './interview-template.service';

@Component({
    selector: 'jhi-interview-template-dialog',
    templateUrl: './interview-template-dialog.component.html'
})
export class InterviewTemplateDialogComponent implements OnInit {

    interviewTemplate: InterviewTemplate;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private interviewTemplateService: InterviewTemplateService,
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
        if (this.interviewTemplate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.interviewTemplateService.update(this.interviewTemplate));
        } else {
            this.subscribeToSaveResponse(
                this.interviewTemplateService.create(this.interviewTemplate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InterviewTemplate>>) {
        result.subscribe((res: HttpResponse<InterviewTemplate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InterviewTemplate) {
        this.eventManager.broadcast({ name: 'interviewTemplateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-interview-template-popup',
    template: ''
})
export class InterviewTemplatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interviewTemplatePopupService: InterviewTemplatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.interviewTemplatePopupService
                    .open(InterviewTemplateDialogComponent as Component, params['id']);
            } else {
                this.interviewTemplatePopupService
                    .open(InterviewTemplateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
