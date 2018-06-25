import { Injectable } from '@angular/core';
import { ModalDialogComponent } from './modal-dialog.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalDialogService {
    private isOpen = false;

    constructor(
        private modalService: NgbModal
    ) { }

    open(titleMsgKey: string, contentMsgKey: string, okButton:  Map<string, VoidFunction>, isCheckIcon: boolean = true): NgbModalRef {
        // do nothing if the dialog is displaying
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        // show modal dialog with provided parameters
        const modalRef = this.modalService.open(ModalDialogComponent);
        modalRef.componentInstance.titleMsgKey = titleMsgKey;
        modalRef.componentInstance.contentMsgKey = contentMsgKey;
        modalRef.componentInstance.okButton = okButton;
        modalRef.componentInstance.isCheckIcon = isCheckIcon;
        // update modal status on success and failure
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }
}
