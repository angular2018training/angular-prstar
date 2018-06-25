import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BidChangeRequestHistory } from './bid-change-request-history.model';
import { BidChangeRequestHistoryPopupService } from './bid-change-request-history-popup.service';
import { BidChangeRequestHistoryService } from './bid-change-request-history.service';

@Component({
    selector: 'jhi-bid-change-request-history-dialog',
    templateUrl: './bid-change-request-history-dialog.component.html'
})
export class BidChangeRequestHistoryDialogComponent implements OnInit {

    bidChangeRequestHistory: BidChangeRequestHistory;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bidChangeRequestHistoryService: BidChangeRequestHistoryService,
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
        if (this.bidChangeRequestHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bidChangeRequestHistoryService.update(this.bidChangeRequestHistory));
        } else {
            this.subscribeToSaveResponse(
                this.bidChangeRequestHistoryService.create(this.bidChangeRequestHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BidChangeRequestHistory>>) {
        result.subscribe((res: HttpResponse<BidChangeRequestHistory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BidChangeRequestHistory) {
        this.eventManager.broadcast({ name: 'bidChangeRequestHistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-bid-change-request-history-popup',
    template: ''
})
export class BidChangeRequestHistoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bidChangeRequestHistoryPopupService: BidChangeRequestHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bidChangeRequestHistoryPopupService
                    .open(BidChangeRequestHistoryDialogComponent as Component, params['id']);
            } else {
                this.bidChangeRequestHistoryPopupService
                    .open(BidChangeRequestHistoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
