import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Contract } from './contract.model';
import { ContractPopupService } from './contract-popup.service';
import { ContractService } from './contract.service';

@Component({
    selector: 'jhi-contract-dialog',
    templateUrl: './contract-dialog.component.html'
})
export class ContractDialogComponent implements OnInit {

    contract: Contract;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private contractService: ContractService,
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
        if (this.contract.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contractService.update(this.contract));
        } else {
            this.subscribeToSaveResponse(
                this.contractService.create(this.contract));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Contract>>) {
        result.subscribe((res: HttpResponse<Contract>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Contract) {
        this.eventManager.broadcast({ name: 'contractListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-contract-popup',
    template: ''
})
export class ContractPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contractPopupService: ContractPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contractPopupService
                    .open(ContractDialogComponent as Component, params['id']);
            } else {
                this.contractPopupService
                    .open(ContractDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
