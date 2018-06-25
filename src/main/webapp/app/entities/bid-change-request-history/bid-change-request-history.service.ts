import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BidChangeRequestHistory } from './bid-change-request-history.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BidChangeRequestHistory>;

@Injectable()
export class BidChangeRequestHistoryService {

    private resourceUrl =  SERVER_API_URL + 'api/bid-change-request-histories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(bidChangeRequestHistory: BidChangeRequestHistory): Observable<EntityResponseType> {
        const copy = this.convert(bidChangeRequestHistory);
        return this.http.post<BidChangeRequestHistory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bidChangeRequestHistory: BidChangeRequestHistory): Observable<EntityResponseType> {
        const copy = this.convert(bidChangeRequestHistory);
        return this.http.put<BidChangeRequestHistory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BidChangeRequestHistory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BidChangeRequestHistory[]>> {
        const options = createRequestOption(req);
        return this.http.get<BidChangeRequestHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BidChangeRequestHistory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BidChangeRequestHistory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BidChangeRequestHistory[]>): HttpResponse<BidChangeRequestHistory[]> {
        const jsonResponse: BidChangeRequestHistory[] = res.body;
        const body: BidChangeRequestHistory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BidChangeRequestHistory.
     */
    private convertItemFromServer(bidChangeRequestHistory: BidChangeRequestHistory): BidChangeRequestHistory {
        const copy: BidChangeRequestHistory = Object.assign({}, bidChangeRequestHistory);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(bidChangeRequestHistory.createdDate);
        return copy;
    }

    /**
     * Convert a BidChangeRequestHistory to a JSON which can be sent to the server.
     */
    private convert(bidChangeRequestHistory: BidChangeRequestHistory): BidChangeRequestHistory {
        const copy: BidChangeRequestHistory = Object.assign({}, bidChangeRequestHistory);

        copy.createdDate = this.dateUtils.toDate(bidChangeRequestHistory.createdDate);
        return copy;
    }
}
