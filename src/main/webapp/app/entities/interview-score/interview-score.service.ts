import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InterviewScore } from './interview-score.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InterviewScore>;

@Injectable()
export class InterviewScoreService {

    private resourceUrl =  SERVER_API_URL + 'api/interview-scores';

    constructor(private http: HttpClient) { }

    create(interviewScore: InterviewScore): Observable<EntityResponseType> {
        const copy = this.convert(interviewScore);
        return this.http.post<InterviewScore>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(interviewScore: InterviewScore): Observable<EntityResponseType> {
        const copy = this.convert(interviewScore);
        return this.http.put<InterviewScore>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InterviewScore>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InterviewScore[]>> {
        const options = createRequestOption(req);
        return this.http.get<InterviewScore[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InterviewScore[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InterviewScore = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InterviewScore[]>): HttpResponse<InterviewScore[]> {
        const jsonResponse: InterviewScore[] = res.body;
        const body: InterviewScore[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InterviewScore.
     */
    private convertItemFromServer(interviewScore: InterviewScore): InterviewScore {
        const copy: InterviewScore = Object.assign({}, interviewScore);
        return copy;
    }

    /**
     * Convert a InterviewScore to a JSON which can be sent to the server.
     */
    private convert(interviewScore: InterviewScore): InterviewScore {
        const copy: InterviewScore = Object.assign({}, interviewScore);
        return copy;
    }
}
