import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { VettingModel } from './vetting.model';
import { Pro } from './../../entities/pro/pro.model';
import { createRequestOption } from '../../shared';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export type EntityResponseType = HttpResponse<VettingModel>;

@Injectable()
export class VettingService {
    private isOpen = false;
    private pro: Pro;
    private resourceUrl = SERVER_API_URL + 'api/vet-change-logs';

    constructor(
        private http: HttpClient,
        private dateUtils: JhiDateUtils,
        private modalService: NgbModal) { }

    create(vetting: VettingModel): Observable<EntityResponseType> {
        const copy = this.convert(vetting);
        return this.http.post<VettingModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }


    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VettingModel = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }


    /**
     * Convert a returned JSON object to VetChangeLog.
     */
    private convertItemFromServer(vetChangeLog: VettingModel): VettingModel {
        const copy: VettingModel = Object.assign({}, vetChangeLog);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(vetChangeLog.createdDate);
        return copy;
    }

    /**
     * Convert a VetChangeLog to a JSON which can be sent to the server.
     */
    private convert(vetChangeLog: VettingModel): VettingModel {
        const copy: VettingModel = Object.assign({}, vetChangeLog);

        copy.createdDate = this.dateUtils.toDate(vetChangeLog.createdDate);
        return copy;
    }


    open(pro): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(ApplicantDetailComponent);
        modalRef.componentInstance.pro = pro;
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }
}
