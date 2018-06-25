import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InterviewTemplate } from './interview-template.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InterviewTemplate>;

@Injectable()
export class InterviewTemplateService {

    private resourceUrl =  SERVER_API_URL + 'api/interview-templates';

    constructor(private http: HttpClient) { }

    create(interviewTemplate: InterviewTemplate): Observable<EntityResponseType> {
        const copy = this.convert(interviewTemplate);
        return this.http.post<InterviewTemplate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(interviewTemplate: InterviewTemplate): Observable<EntityResponseType> {
        const copy = this.convert(interviewTemplate);
        return this.http.put<InterviewTemplate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InterviewTemplate>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InterviewTemplate[]>> {
        const options = createRequestOption(req);
        return this.http.get<InterviewTemplate[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InterviewTemplate[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InterviewTemplate = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InterviewTemplate[]>): HttpResponse<InterviewTemplate[]> {
        const jsonResponse: InterviewTemplate[] = res.body;
        const body: InterviewTemplate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InterviewTemplate.
     */
    private convertItemFromServer(interviewTemplate: InterviewTemplate): InterviewTemplate {
        const copy: InterviewTemplate = Object.assign({}, interviewTemplate);
        return copy;
    }

    /**
     * Convert a InterviewTemplate to a JSON which can be sent to the server.
     */
    private convert(interviewTemplate: InterviewTemplate): InterviewTemplate {
        const copy: InterviewTemplate = Object.assign({}, interviewTemplate);
        return copy;
    }
}
