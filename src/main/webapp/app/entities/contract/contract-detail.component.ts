import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Contract } from './contract.model';
import { ContractService } from './contract.service';

@Component({
    selector: 'jhi-contract-detail',
    templateUrl: './contract-detail.component.html'
})
export class ContractDetailComponent implements OnInit, OnDestroy {

    contract: Contract;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contractService: ContractService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContracts();
    }

    load(id) {
        this.contractService.find(id)
            .subscribe((contractResponse: HttpResponse<Contract>) => {
                this.contract = contractResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContracts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contractListModification',
            (response) => this.load(this.contract.id)
        );
    }
}
