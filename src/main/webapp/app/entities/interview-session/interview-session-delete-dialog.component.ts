import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InterviewSession } from './interview-session.model';
import { InterviewSessionPopupService } from './interview-session-popup.service';
import { InterviewSessionService } from './interview-session.service';

@Component({
    selector: 'jhi-interview-session-delete-dialog',
    templateUrl: './interview-session-delete-dialog.component.html'
})
export class InterviewSessionDeleteDialogComponent {

    interviewSession: InterviewSession;

    constructor(
        private interviewSessionService: InterviewSessionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interviewSessionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'interviewSessionListModification',
                content: 'Deleted an interviewSession'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interview-session-delete-popup',
    template: ''
})
export class InterviewSessionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interviewSessionPopupService: InterviewSessionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.interviewSessionPopupService
                .open(InterviewSessionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
