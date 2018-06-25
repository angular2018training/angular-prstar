import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BizDelegation } from './biz-delegation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BizDelegation>;

@Injectable()
export class BizDelegationService {

    private resourceUrl =  SERVER_API_URL + 'api/biz-delegations';

    constructor(private http: HttpClient) { }

    create(bizDelegation: BizDelegation): Observable<EntityResponseType> {
        const copy = this.convert(bizDelegation);
        return this.http.post<BizDelegation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bizDelegation: BizDelegation): Observable<EntityResponseType> {
        const copy = this.convert(bizDelegation);
        return this.http.put<BizDelegation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BizDelegation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByUserId(id: number): Observable<HttpResponse<BizDelegation[]>> {
        return this.http.get<BizDelegation[]>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: HttpResponse<BizDelegation[]>) => this.convertArrayResponse(res));
    }

    // findByUserId(id: number): Observable<EntityResponseType> {
    //     return this.http.get<BizDelegation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
    //         .map((res: EntityResponseType) => this.convertResponse(res));
    // }

    query(req?: any): Observable<HttpResponse<BizDelegation[]>> {
        const options = createRequestOption(req);
        return this.http.get<BizDelegation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BizDelegation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BizDelegation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BizDelegation[]>): HttpResponse<BizDelegation[]> {
        const jsonResponse: BizDelegation[] = res.body;
        const body: BizDelegation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BizDelegation.
     */
    private convertItemFromServer(bizDelegation: BizDelegation): BizDelegation {
        const copy: BizDelegation = Object.assign({}, bizDelegation);
        return copy;
    }

    /**
     * Convert a BizDelegation to a JSON which can be sent to the server.
     */
    private convert(bizDelegation: BizDelegation): BizDelegation {
        const copy: BizDelegation = Object.assign({}, bizDelegation);
        return copy;
    }
}
