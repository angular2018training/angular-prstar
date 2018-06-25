import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ChangeRequestBidModalComponent } from './change-request-bid-modal.component';

@Injectable()
export class ChangeRequestBidModalService {
    private isOpen = false;

    constructor(
        private modalService: NgbModal
    ) { }

    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(ChangeRequestBidModalComponent);
        
        return modalRef;
    }

    modalClosed() {
        this.isOpen = false;
    }

}