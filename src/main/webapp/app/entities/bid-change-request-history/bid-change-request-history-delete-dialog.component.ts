import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BidChangeRequestHistory } from './bid-change-request-history.model';
import { BidChangeRequestHistoryPopupService } from './bid-change-request-history-popup.service';
import { BidChangeRequestHistoryService } from './bid-change-request-history.service';

@Component({
    selector: 'jhi-bid-change-request-history-delete-dialog',
    templateUrl: './bid-change-request-history-delete-dialog.component.html'
})
export class BidChangeRequestHistoryDeleteDialogComponent {

    bidChangeRequestHistory: BidChangeRequestHistory;

    constructor(
        private bidChangeRequestHistoryService: BidChangeRequestHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bidChangeRequestHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bidChangeRequestHistoryListModification',
                content: 'Deleted an bidChangeRequestHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bid-change-request-history-delete-popup',
    template: ''
})
export class BidChangeRequestHistoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bidChangeRequestHistoryPopupService: BidChangeRequestHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bidChangeRequestHistoryPopupService
                .open(BidChangeRequestHistoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
