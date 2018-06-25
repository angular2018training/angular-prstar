import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SuggestedInterviewSchedule } from './suggested-interview-schedule.model';
import { SuggestedInterviewSchedulePopupService } from './suggested-interview-schedule-popup.service';
import { SuggestedInterviewScheduleService } from './suggested-interview-schedule.service';

@Component({
    selector: 'jhi-suggested-interview-schedule-delete-dialog',
    templateUrl: './suggested-interview-schedule-delete-dialog.component.html'
})
export class SuggestedInterviewScheduleDeleteDialogComponent {

    suggestedInterviewSchedule: SuggestedInterviewSchedule;

    constructor(
        private suggestedInterviewScheduleService: SuggestedInterviewScheduleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.suggestedInterviewScheduleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'suggestedInterviewScheduleListModification',
                content: 'Deleted an suggestedInterviewSchedule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-suggested-interview-schedule-delete-popup',
    template: ''
})
export class SuggestedInterviewScheduleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private suggestedInterviewSchedulePopupService: SuggestedInterviewSchedulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.suggestedInterviewSchedulePopupService
                .open(SuggestedInterviewScheduleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
