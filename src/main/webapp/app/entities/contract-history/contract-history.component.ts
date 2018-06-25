import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ContractHistory } from './contract-history.model';
import { ContractHistoryService } from './contract-history.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-contract-history',
    templateUrl: './contract-history.component.html'
})
export class ContractHistoryComponent implements OnInit, OnDestroy {
contractHistories: ContractHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contractHistoryService: ContractHistoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.contractHistoryService.query().subscribe(
            (res: HttpResponse<ContractHistory[]>) => {
                this.contractHistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContractHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ContractHistory) {
        return item.id;
    }
    registerChangeInContractHistories() {
        this.eventSubscriber = this.eventManager.subscribe('contractHistoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
