import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ContractHistory } from './contract-history.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ContractHistory>;

@Injectable()
export class ContractHistoryService {

    private resourceUrl =  SERVER_API_URL + 'api/contract-histories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(contractHistory: ContractHistory): Observable<EntityResponseType> {
        const copy = this.convert(contractHistory);
        return this.http.post<ContractHistory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(contractHistory: ContractHistory): Observable<EntityResponseType> {
        const copy = this.convert(contractHistory);
        return this.http.put<ContractHistory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ContractHistory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ContractHistory[]>> {
        const options = createRequestOption(req);
        return this.http.get<ContractHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ContractHistory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ContractHistory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ContractHistory[]>): HttpResponse<ContractHistory[]> {
        const jsonResponse: ContractHistory[] = res.body;
        const body: ContractHistory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ContractHistory.
     */
    private convertItemFromServer(contractHistory: ContractHistory): ContractHistory {
        const copy: ContractHistory = Object.assign({}, contractHistory);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(contractHistory.createdDate);
        return copy;
    }

    /**
     * Convert a ContractHistory to a JSON which can be sent to the server.
     */
    private convert(contractHistory: ContractHistory): ContractHistory {
        const copy: ContractHistory = Object.assign({}, contractHistory);

        copy.createdDate = this.dateUtils.toDate(contractHistory.createdDate);
        return copy;
    }
}
