import { BizProfileResultComponent } from './biz-profile-result.component';
import { BizCheckEmailComponent } from './biz-check-email.component';
import { BizSummarySuccessComponent } from './biz-summary-success.component';
import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class BizProfileModalService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
    ) {}
    

    open(fromSummary: boolean, onClose: () => void): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        var modalRef;
        if (fromSummary) {
            modalRef = this.modalService.open(BizSummarySuccessComponent);
        } else {
            modalRef = this.modalService.open(BizCheckEmailComponent);
        }
        modalRef.result.then((result) => {
            this.isOpen = false;
            onClose();
        }, (reason) => {
            this.isOpen = false;
            onClose();
        });
        return modalRef;
    }

}
