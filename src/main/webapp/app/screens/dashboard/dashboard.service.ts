import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ProDashboard } from './dashboard.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProDashboard>;

@Injectable()
export class DashboardService {

    private resourceUrl =  SERVER_API_URL + 'api/pro-dashboard';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(bid: ProDashboard): Observable<EntityResponseType> {
        const copy = this.convert(bid);
        return this.http.post<ProDashboard>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bid: ProDashboard): Observable<EntityResponseType> {
        const copy = this.convert(bid);
        return this.http.put<ProDashboard>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProDashboard>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProDashboard[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProDashboard[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProDashboard[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    getAll(): Observable<EntityResponseType> {
        return this.http.get<ProDashboard>(`${this.resourceUrl}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProDashboard = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProDashboard[]>): HttpResponse<ProDashboard[]> {
        const jsonResponse: ProDashboard[] = res.body;
        const body: ProDashboard[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Bid.
     */
    private convertItemFromServer(bid: ProDashboard): ProDashboard {
        const copy: ProDashboard = Object.assign({}, bid);

        return copy;
    }

    /**
     * Convert a Bid to a JSON which can be sent to the server.
     */
    private convert(bid: ProDashboard): ProDashboard {
        const copy: ProDashboard = Object.assign({}, bid);

        return copy;
    }
}
