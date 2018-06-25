import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Contract } from './contract.model';
import { ContractService } from './contract.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-contract',
    templateUrl: './contract.component.html'
})
export class ContractComponent implements OnInit, OnDestroy {
contracts: Contract[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contractService: ContractService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.contractService.query().subscribe(
            (res: HttpResponse<Contract[]>) => {
                this.contracts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContracts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Contract) {
        return item.id;
    }
    registerChangeInContracts() {
        this.eventSubscriber = this.eventManager.subscribe('contractListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
