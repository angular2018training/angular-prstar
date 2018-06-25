import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ProRequirement } from './pro-requirement.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProRequirement>;

@Injectable()
export class ProRequirementService {

    private resourceUrl =  SERVER_API_URL + 'api/pro-requirements';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(proRequirement: ProRequirement): Observable<EntityResponseType> {
        const copy = this.convert(proRequirement);
        return this.http.post<ProRequirement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(proRequirement: ProRequirement): Observable<EntityResponseType> {
        const copy = this.convert(proRequirement);
        return this.http.put<ProRequirement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProRequirement>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProRequirement[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProRequirement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProRequirement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProRequirement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProRequirement[]>): HttpResponse<ProRequirement[]> {
        const jsonResponse: ProRequirement[] = res.body;
        const body: ProRequirement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProRequirement.
     */
    private convertItemFromServer(proRequirement: ProRequirement): ProRequirement {
        const copy: ProRequirement = Object.assign({}, proRequirement);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(proRequirement.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(proRequirement.endDate);
        return copy;
    }

    /**
     * Convert a ProRequirement to a JSON which can be sent to the server.
     */
    private convert(proRequirement: ProRequirement): ProRequirement {
        const copy: ProRequirement = Object.assign({}, proRequirement);

        copy.startDate = this.dateUtils.toDate(proRequirement.startDate);

        copy.endDate = this.dateUtils.toDate(proRequirement.endDate);
        return copy;
    }
}
