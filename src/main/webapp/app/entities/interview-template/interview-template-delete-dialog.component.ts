import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InterviewTemplate } from './interview-template.model';
import { InterviewTemplatePopupService } from './interview-template-popup.service';
import { InterviewTemplateService } from './interview-template.service';

@Component({
    selector: 'jhi-interview-template-delete-dialog',
    templateUrl: './interview-template-delete-dialog.component.html'
})
export class InterviewTemplateDeleteDialogComponent {

    interviewTemplate: InterviewTemplate;

    constructor(
        private interviewTemplateService: InterviewTemplateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interviewTemplateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'interviewTemplateListModification',
                content: 'Deleted an interviewTemplate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interview-template-delete-popup',
    template: ''
})
export class InterviewTemplateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interviewTemplatePopupService: InterviewTemplatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.interviewTemplatePopupService
                .open(InterviewTemplateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
