import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ContractHistory } from './contract-history.model';
import { ContractHistoryService } from './contract-history.service';

@Component({
    selector: 'jhi-contract-history-detail',
    templateUrl: './contract-history-detail.component.html'
})
export class ContractHistoryDetailComponent implements OnInit, OnDestroy {

    contractHistory: ContractHistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contractHistoryService: ContractHistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContractHistories();
    }

    load(id) {
        this.contractHistoryService.find(id)
            .subscribe((contractHistoryResponse: HttpResponse<ContractHistory>) => {
                this.contractHistory = contractHistoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContractHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contractHistoryListModification',
            (response) => this.load(this.contractHistory.id)
        );
    }
}
