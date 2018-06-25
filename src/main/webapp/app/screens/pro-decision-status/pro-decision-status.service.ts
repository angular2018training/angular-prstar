import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProDecisionStatusComponent } from './pro-decision-status.component';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProDecisionService {
    private resourceUrl = SERVER_API_URL + 'api/pros/decision';
    private isOpen = false;

    constructor(
        private modalService: NgbModal,
        private http: HttpClient
    ) { }

    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(ProDecisionStatusComponent);
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }

}