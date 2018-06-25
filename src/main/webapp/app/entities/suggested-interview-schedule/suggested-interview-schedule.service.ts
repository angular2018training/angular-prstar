import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SuggestedInterviewSchedule } from './suggested-interview-schedule.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SuggestedInterviewSchedule>;

@Injectable()
export class SuggestedInterviewScheduleService {

    private resourceUrl =  SERVER_API_URL + 'api/suggested-interview-schedules';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(suggestedInterviewSchedule: SuggestedInterviewSchedule): Observable<EntityResponseType> {
        const copy = this.convert(suggestedInterviewSchedule);
        return this.http.post<SuggestedInterviewSchedule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(suggestedInterviewSchedule: SuggestedInterviewSchedule): Observable<EntityResponseType> {
        const copy = this.convert(suggestedInterviewSchedule);
        return this.http.put<SuggestedInterviewSchedule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SuggestedInterviewSchedule>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SuggestedInterviewSchedule[]>> {
        const options = createRequestOption(req);
        return this.http.get<SuggestedInterviewSchedule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SuggestedInterviewSchedule[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SuggestedInterviewSchedule = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SuggestedInterviewSchedule[]>): HttpResponse<SuggestedInterviewSchedule[]> {
        const jsonResponse: SuggestedInterviewSchedule[] = res.body;
        const body: SuggestedInterviewSchedule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SuggestedInterviewSchedule.
     */
    private convertItemFromServer(suggestedInterviewSchedule: SuggestedInterviewSchedule): SuggestedInterviewSchedule {
        const copy: SuggestedInterviewSchedule = Object.assign({}, suggestedInterviewSchedule);
        copy.interviewDate = this.dateUtils
            .convertDateTimeFromServer(suggestedInterviewSchedule.interviewDate);
        return copy;
    }

    /**
     * Convert a SuggestedInterviewSchedule to a JSON which can be sent to the server.
     */
    private convert(suggestedInterviewSchedule: SuggestedInterviewSchedule): SuggestedInterviewSchedule {
        const copy: SuggestedInterviewSchedule = Object.assign({}, suggestedInterviewSchedule);

        copy.interviewDate = this.dateUtils.toDate(suggestedInterviewSchedule.interviewDate);
        return copy;
    }
}
