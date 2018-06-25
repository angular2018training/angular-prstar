import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BidChangeRequestHistory } from './bid-change-request-history.model';
import { BidChangeRequestHistoryService } from './bid-change-request-history.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bid-change-request-history',
    templateUrl: './bid-change-request-history.component.html'
})
export class BidChangeRequestHistoryComponent implements OnInit, OnDestroy {
bidChangeRequestHistories: BidChangeRequestHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bidChangeRequestHistoryService: BidChangeRequestHistoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bidChangeRequestHistoryService.query().subscribe(
            (res: HttpResponse<BidChangeRequestHistory[]>) => {
                this.bidChangeRequestHistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBidChangeRequestHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BidChangeRequestHistory) {
        return item.id;
    }
    registerChangeInBidChangeRequestHistories() {
        this.eventSubscriber = this.eventManager.subscribe('bidChangeRequestHistoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
