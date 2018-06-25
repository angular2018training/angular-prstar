import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InterviewScore } from './interview-score.model';
import { InterviewScorePopupService } from './interview-score-popup.service';
import { InterviewScoreService } from './interview-score.service';

@Component({
    selector: 'jhi-interview-score-delete-dialog',
    templateUrl: './interview-score-delete-dialog.component.html'
})
export class InterviewScoreDeleteDialogComponent {

    interviewScore: InterviewScore;

    constructor(
        private interviewScoreService: InterviewScoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interviewScoreService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'interviewScoreListModification',
                content: 'Deleted an interviewScore'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interview-score-delete-popup',
    template: ''
})
export class InterviewScoreDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interviewScorePopupService: InterviewScorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.interviewScorePopupService
                .open(InterviewScoreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
