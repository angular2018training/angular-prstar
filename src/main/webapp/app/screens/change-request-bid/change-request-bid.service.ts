import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ChangeRequestBid } from './change-request-bid.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChangeRequestBid>;

@Injectable()
export class ChangeRequestBidService {
    @Input() changeRequestBid: ChangeRequestBid;

    public bidID: number;
    public proID: number;

    private resourceUrl =  SERVER_API_URL + 'api/bid-change-request-histories';

    constructor(private http: HttpClient) { }

    create(changeRequest: ChangeRequestBid): Observable<EntityResponseType> {
        const copy = this.convert(changeRequest);
        return this.http.post<ChangeRequestBid>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(changeRequest: ChangeRequestBid): Observable<EntityResponseType> {
        const copy = this.convert(changeRequest);
        return this.http.put<ChangeRequestBid>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChangeRequestBid>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChangeRequestBid[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChangeRequestBid[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChangeRequestBid[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChangeRequestBid = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChangeRequestBid[]>): HttpResponse<ChangeRequestBid[]> {
        const jsonResponse: ChangeRequestBid[] = res.body;
        const body: ChangeRequestBid[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to changeRequest.
     */
    private convertItemFromServer(changeRequest: ChangeRequestBid): ChangeRequestBid {
        const copy: ChangeRequestBid = Object.assign({}, changeRequest);
        return copy;
    }

    /**
     * Convert a changeRequest to a JSON which can be sent to the server.
     */
    private convert(changeRequest: ChangeRequestBid): ChangeRequestBid {
        const copy: ChangeRequestBid = Object.assign({}, changeRequest);
        return copy;
    }

    getBidChangeRequestHistory(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/bid/${id}`);
    }

    createBidChangeRequestHistory(changeRequest: ChangeRequestBid): Observable<EntityResponseType> {
        return this.http.post<ChangeRequestBid>(this.resourceUrl, changeRequest, { observe: 'response' })
        .map((res: EntityResponseType) => this.convertResponse(res));
    } 
}
