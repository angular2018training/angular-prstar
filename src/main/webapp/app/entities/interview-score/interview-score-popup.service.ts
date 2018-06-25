import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { InterviewScore } from './interview-score.model';
import { InterviewScoreService } from './interview-score.service';

@Injectable()
export class InterviewScorePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private interviewScoreService: InterviewScoreService

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
                this.interviewScoreService.find(id)
                    .subscribe((interviewScoreResponse: HttpResponse<InterviewScore>) => {
                        const interviewScore: InterviewScore = interviewScoreResponse.body;
                        this.ngbModalRef = this.interviewScoreModalRef(component, interviewScore);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.interviewScoreModalRef(component, new InterviewScore());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    interviewScoreModalRef(component: Component, interviewScore: InterviewScore): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.interviewScore = interviewScore;
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
