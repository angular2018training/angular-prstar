import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BidChangeRequestHistory } from './bid-change-request-history.model';
import { BidChangeRequestHistoryService } from './bid-change-request-history.service';

@Injectable()
export class BidChangeRequestHistoryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private bidChangeRequestHistoryService: BidChangeRequestHistoryService

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
                this.bidChangeRequestHistoryService.find(id)
                    .subscribe((bidChangeRequestHistoryResponse: HttpResponse<BidChangeRequestHistory>) => {
                        const bidChangeRequestHistory: BidChangeRequestHistory = bidChangeRequestHistoryResponse.body;
                        bidChangeRequestHistory.createdDate = this.datePipe
                            .transform(bidChangeRequestHistory.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.bidChangeRequestHistoryModalRef(component, bidChangeRequestHistory);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bidChangeRequestHistoryModalRef(component, new BidChangeRequestHistory());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bidChangeRequestHistoryModalRef(component: Component, bidChangeRequestHistory: BidChangeRequestHistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bidChangeRequestHistory = bidChangeRequestHistory;
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
