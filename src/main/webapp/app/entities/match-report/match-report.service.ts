import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MatchReport } from './match-report.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MatchReport>;

@Injectable()
export class MatchReportService {

    private resourceUrl =  SERVER_API_URL + 'api/match-reports';

    constructor(private http: HttpClient) { }

    create(matchReport: MatchReport): Observable<EntityResponseType> {
        const copy = this.convert(matchReport);
        return this.http.post<MatchReport>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(matchReport: MatchReport): Observable<EntityResponseType> {
        const copy = this.convert(matchReport);
        return this.http.put<MatchReport>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MatchReport>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MatchReport[]>> {
        const options = createRequestOption(req);
        return this.http.get<MatchReport[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MatchReport[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MatchReport = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MatchReport[]>): HttpResponse<MatchReport[]> {
        const jsonResponse: MatchReport[] = res.body;
        const body: MatchReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MatchReport.
     */
    private convertItemFromServer(matchReport: MatchReport): MatchReport {
        const copy: MatchReport = Object.assign({}, matchReport);
        return copy;
    }

    /**
     * Convert a MatchReport to a JSON which can be sent to the server.
     */
    private convert(matchReport: MatchReport): MatchReport {
        const copy: MatchReport = Object.assign({}, matchReport);
        return copy;
    }
}
