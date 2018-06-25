import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { InterviewSession } from './interview-session.model';
import { InterviewSessionService } from './interview-session.service';

@Injectable()
export class InterviewSessionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private interviewSessionService: InterviewSessionService

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
                this.interviewSessionService.find(id)
                    .subscribe((interviewSessionResponse: HttpResponse<InterviewSession>) => {
                        const interviewSession: InterviewSession = interviewSessionResponse.body;
                        interviewSession.interviewDate = this.datePipe
                            .transform(interviewSession.interviewDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.interviewSessionModalRef(component, interviewSession);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.interviewSessionModalRef(component, new InterviewSession());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    interviewSessionModalRef(component: Component, interviewSession: InterviewSession): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.interviewSession = interviewSession;
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
