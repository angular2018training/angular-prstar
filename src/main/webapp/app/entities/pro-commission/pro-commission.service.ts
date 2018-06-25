import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProCommission } from './pro-commission.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProCommission>;

@Injectable()
export class ProCommissionService {

    private resourceUrl =  SERVER_API_URL + 'api/pro-commissions';

    constructor(private http: HttpClient) { }

    create(proCommission: ProCommission): Observable<EntityResponseType> {
        const copy = this.convert(proCommission);
        return this.http.post<ProCommission>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(proCommission: ProCommission): Observable<EntityResponseType> {
        const copy = this.convert(proCommission);
        return this.http.put<ProCommission>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProCommission>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProCommission[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProCommission[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProCommission[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProCommission = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProCommission[]>): HttpResponse<ProCommission[]> {
        const jsonResponse: ProCommission[] = res.body;
        const body: ProCommission[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProCommission.
     */
    private convertItemFromServer(proCommission: ProCommission): ProCommission {
        const copy: ProCommission = Object.assign({}, proCommission);
        return copy;
    }

    /**
     * Convert a ProCommission to a JSON which can be sent to the server.
     */
    private convert(proCommission: ProCommission): ProCommission {
        const copy: ProCommission = Object.assign({}, proCommission);
        return copy;
    }
}
