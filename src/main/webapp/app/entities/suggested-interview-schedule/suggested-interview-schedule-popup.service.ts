import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SuggestedInterviewSchedule } from './suggested-interview-schedule.model';
import { SuggestedInterviewScheduleService } from './suggested-interview-schedule.service';

@Injectable()
export class SuggestedInterviewSchedulePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private suggestedInterviewScheduleService: SuggestedInterviewScheduleService

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
                this.suggestedInterviewScheduleService.find(id)
                    .subscribe((suggestedInterviewScheduleResponse: HttpResponse<SuggestedInterviewSchedule>) => {
                        const suggestedInterviewSchedule: SuggestedInterviewSchedule = suggestedInterviewScheduleResponse.body;
                        suggestedInterviewSchedule.interviewDate = this.datePipe
                            .transform(suggestedInterviewSchedule.interviewDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.suggestedInterviewScheduleModalRef(component, suggestedInterviewSchedule);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.suggestedInterviewScheduleModalRef(component, new SuggestedInterviewSchedule());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    suggestedInterviewScheduleModalRef(component: Component, suggestedInterviewSchedule: SuggestedInterviewSchedule): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.suggestedInterviewSchedule = suggestedInterviewSchedule;
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
