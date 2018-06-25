import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PostResultComponent } from './post-result.component';

@Injectable()
export class PostModalService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal
    ) {}

    open(isCreatePost:boolean, proRequestId: number): NgbModalRef {
        let ngbModalOptions: NgbModalOptions = {
            backdrop : 'static',
            keyboard : false
        };
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(PostResultComponent,ngbModalOptions);
        modalRef.componentInstance.isCreatePost = isCreatePost;
        modalRef.componentInstance.proRequestId = proRequestId;
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }

}
