import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ContractHistory } from './contract-history.model';
import { ContractHistoryService } from './contract-history.service';

@Injectable()
export class ContractHistoryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private contractHistoryService: ContractHistoryService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.contractHistoryService.find(id)
                    .subscribe((contractHistoryResponse: HttpResponse<ContractHistory>) => {
                        const contractHistory: ContractHistory = contractHistoryResponse.body;
                        contractHistory.createdDate = this.datePipe
                            .transform(contractHistory.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.contractHistoryModalRef(component, contractHistory);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.contractHistoryModalRef(component, new ContractHistory());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    contractHistoryModalRef(component: Component, contractHistory: ContractHistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.contractHistory = contractHistory;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
