import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import {CommissionLevel, Role, BaseMasterEntity, Authority} from './master.model';
import { createRequestOption } from '../model/request-util';
import {Industry} from "../../entities/industry/industry.model";

export type EntityResponseType = HttpResponse<Authority>;

@Injectable()
export class MasterService {

    private resourceUrl =  SERVER_API_URL + 'api/master';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    commissionLevels(req?: any): Observable<HttpResponse<CommissionLevel[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommissionLevel[]>(this.resourceUrl + '/commission-levels', { params: options, observe: 'response' });
    }

    bizRoles(req?: any): Observable<HttpResponse<Authority[]>> {
        const options = createRequestOption(req);
        return this.http.get<Authority[]>(this.resourceUrl + '/authorities', { params: options, observe: 'response' });
    }

    createBizRole(authority: Authority): Observable<EntityResponseType> {
        return this.http.post<Authority>(this.resourceUrl + '/authorities', authority, { observe: 'response' })
            .map((res: EntityResponseType) => {
                return this.convertResponse(res);
            });
    }

    roles(req?: any): Observable<HttpResponse<BaseMasterEntity[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaseMasterEntity[]>(this.resourceUrl + '/roles', { params: options, observe: 'response' })
            .map((res: HttpResponse<BaseMasterEntity[]>) => this.convertBaseMasterEntityArrayResponse(res));
    }

    skills(req?: any): Observable<HttpResponse<BaseMasterEntity[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaseMasterEntity[]>(this.resourceUrl + '/skills', { params: options, observe: 'response' })
            .map((res: HttpResponse<BaseMasterEntity[]>) => this.convertBaseMasterEntityArrayResponse(res));
    }

    industries(req?: any): Observable<HttpResponse<BaseMasterEntity[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaseMasterEntity[]>(this.resourceUrl + '/industries', { params: options, observe: 'response' })
            .map((res: HttpResponse<BaseMasterEntity[]>) => this.convertBaseMasterEntityArrayResponse(res));
    }

    paymentTerms(req?: any): Observable<HttpResponse<BaseMasterEntity[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaseMasterEntity[]>(this.resourceUrl + '/payment-terms', { params: options, observe: 'response' })
            .map((res: HttpResponse<BaseMasterEntity[]>) => this.convertBaseMasterEntityArrayResponse(res));
    }

    invoiceTerms(req?: any): Observable<HttpResponse<BaseMasterEntity[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaseMasterEntity[]>(this.resourceUrl + '/invoice-terms', { params: options, observe: 'response' })
            .map((res: HttpResponse<BaseMasterEntity[]>) => this.convertBaseMasterEntityArrayResponse(res));
    }

    /**
     * Convert Master array.
     */
    private convertBaseMasterEntityArrayResponse(res: HttpResponse<BaseMasterEntity[]>): HttpResponse<BaseMasterEntity[]> {
        const jsonResponse: BaseMasterEntity[] = res.body;
        const body: BaseMasterEntity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertBaseMasterItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert Master object.
     */
    private convertBaseMasterItemFromServer(object: BaseMasterEntity): BaseMasterEntity {
        const copy: BaseMasterEntity = Object.assign({}, object);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Authority = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TitlePrefix.
     */
    private convertItemFromServer(authority: Authority): Authority {
        const copy: Authority = Object.assign({}, authority);
        return copy;
    }

}
