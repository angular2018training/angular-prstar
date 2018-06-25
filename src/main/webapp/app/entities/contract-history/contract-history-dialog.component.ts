import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ContractHistory } from './contract-history.model';
import { ContractHistoryPopupService } from './contract-history-popup.service';
import { ContractHistoryService } from './contract-history.service';
import { Contract, ContractService } from '../contract';

@Component({
    selector: 'jhi-contract-history-dialog',
    templateUrl: './contract-history-dialog.component.html'
})
export class ContractHistoryDialogComponent implements OnInit {

    contractHistory: ContractHistory;
    isSaving: boolean;

    contracts: Contract[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private contractHistoryService: ContractHistoryService,
        private contractService: ContractService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.contractService.query()
            .subscribe((res: HttpResponse<Contract[]>) => { this.contracts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contractHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contractHistoryService.update(this.contractHistory));
        } else {
            this.subscribeToSaveResponse(
                this.contractHistoryService.create(this.contractHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ContractHistory>>) {
        result.subscribe((res: HttpResponse<ContractHistory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ContractHistory) {
        this.eventManager.broadcast({ name: 'contractHistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackContractById(index: number, item: Contract) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-contract-history-popup',
    template: ''
})
export class ContractHistoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contractHistoryPopupService: ContractHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contractHistoryPopupService
                    .open(ContractHistoryDialogComponent as Component, params['id']);
            } else {
                this.contractHistoryPopupService
                    .open(ContractHistoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
