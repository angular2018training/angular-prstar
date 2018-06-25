import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SuggestedAnswer } from './suggested-answer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SuggestedAnswer>;

@Injectable()
export class SuggestedAnswerService {

    private resourceUrl =  SERVER_API_URL + 'api/suggested-answers';

    constructor(private http: HttpClient) { }

    create(suggestedAnswer: SuggestedAnswer): Observable<EntityResponseType> {
        const copy = this.convert(suggestedAnswer);
        return this.http.post<SuggestedAnswer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(suggestedAnswer: SuggestedAnswer): Observable<EntityResponseType> {
        const copy = this.convert(suggestedAnswer);
        return this.http.put<SuggestedAnswer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SuggestedAnswer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SuggestedAnswer[]>> {
        const options = createRequestOption(req);
        return this.http.get<SuggestedAnswer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SuggestedAnswer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SuggestedAnswer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SuggestedAnswer[]>): HttpResponse<SuggestedAnswer[]> {
        const jsonResponse: SuggestedAnswer[] = res.body;
        const body: SuggestedAnswer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SuggestedAnswer.
     */
    private convertItemFromServer(suggestedAnswer: SuggestedAnswer): SuggestedAnswer {
        const copy: SuggestedAnswer = Object.assign({}, suggestedAnswer);
        return copy;
    }

    /**
     * Convert a SuggestedAnswer to a JSON which can be sent to the server.
     */
    private convert(suggestedAnswer: SuggestedAnswer): SuggestedAnswer {
        const copy: SuggestedAnswer = Object.assign({}, suggestedAnswer);
        return copy;
    }
}
