import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BidChangeRequestHistory } from './bid-change-request-history.model';
import { BidChangeRequestHistoryService } from './bid-change-request-history.service';

@Component({
    selector: 'jhi-bid-change-request-history-detail',
    templateUrl: './bid-change-request-history-detail.component.html'
})
export class BidChangeRequestHistoryDetailComponent implements OnInit, OnDestroy {

    bidChangeRequestHistory: BidChangeRequestHistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bidChangeRequestHistoryService: BidChangeRequestHistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBidChangeRequestHistories();
    }

    load(id) {
        this.bidChangeRequestHistoryService.find(id)
            .subscribe((bidChangeRequestHistoryResponse: HttpResponse<BidChangeRequestHistory>) => {
                this.bidChangeRequestHistory = bidChangeRequestHistoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBidChangeRequestHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bidChangeRequestHistoryListModification',
            (response) => this.load(this.bidChangeRequestHistory.id)
        );
    }
}
