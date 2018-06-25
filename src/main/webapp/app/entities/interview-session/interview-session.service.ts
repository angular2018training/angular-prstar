import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InterviewSession } from './interview-session.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InterviewSession>;

@Injectable()
export class InterviewSessionService {

    private resourceUrl =  SERVER_API_URL + 'api/interview-sessions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(interviewSession: InterviewSession): Observable<EntityResponseType> {
        const copy = this.convert(interviewSession);
        return this.http.post<InterviewSession>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(interviewSession: InterviewSession): Observable<EntityResponseType> {
        const copy = this.convert(interviewSession);
        return this.http.put<InterviewSession>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InterviewSession>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InterviewSession[]>> {
        const options = createRequestOption(req);
        return this.http.get<InterviewSession[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InterviewSession[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InterviewSession = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InterviewSession[]>): HttpResponse<InterviewSession[]> {
        const jsonResponse: InterviewSession[] = res.body;
        const body: InterviewSession[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InterviewSession.
     */
    private convertItemFromServer(interviewSession: InterviewSession): InterviewSession {
        const copy: InterviewSession = Object.assign({}, interviewSession);
        copy.interviewDate = this.dateUtils
            .convertDateTimeFromServer(interviewSession.interviewDate);
        return copy;
    }

    /**
     * Convert a InterviewSession to a JSON which can be sent to the server.
     */
    private convert(interviewSession: InterviewSession): InterviewSession {
        const copy: InterviewSession = Object.assign({}, interviewSession);

        copy.interviewDate = this.dateUtils.toDate(interviewSession.interviewDate);
        return copy;
    }
}
