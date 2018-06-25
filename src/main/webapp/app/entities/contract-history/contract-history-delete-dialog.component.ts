import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ContractHistory } from './contract-history.model';
import { ContractHistoryPopupService } from './contract-history-popup.service';
import { ContractHistoryService } from './contract-history.service';

@Component({
    selector: 'jhi-contract-history-delete-dialog',
    templateUrl: './contract-history-delete-dialog.component.html'
})
export class ContractHistoryDeleteDialogComponent {

    contractHistory: ContractHistory;

    constructor(
        private contractHistoryService: ContractHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contractHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contractHistoryListModification',
                content: 'Deleted an contractHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contract-history-delete-popup',
    template: ''
})
export class ContractHistoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contractHistoryPopupService: ContractHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.contractHistoryPopupService
                .open(ContractHistoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
