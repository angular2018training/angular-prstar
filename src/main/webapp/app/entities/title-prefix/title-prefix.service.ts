import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TitlePrefix } from './title-prefix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TitlePrefix>;

@Injectable()
export class TitlePrefixService {

    private resourceUrl =  SERVER_API_URL + '/api/master/title-prefixes';

    constructor(private http: HttpClient) { }

    create(titlePrefix: TitlePrefix): Observable<EntityResponseType> {
        const copy = this.convert(titlePrefix);
        return this.http.post<TitlePrefix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(titlePrefix: TitlePrefix): Observable<EntityResponseType> {
        const copy = this.convert(titlePrefix);
        return this.http.put<TitlePrefix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TitlePrefix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TitlePrefix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TitlePrefix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TitlePrefix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TitlePrefix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TitlePrefix[]>): HttpResponse<TitlePrefix[]> {
        const jsonResponse: TitlePrefix[] = res.body;
        const body: TitlePrefix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TitlePrefix.
     */
    private convertItemFromServer(titlePrefix: TitlePrefix): TitlePrefix {
        const copy: TitlePrefix = Object.assign({}, titlePrefix);
        return copy;
    }

    /**
     * Convert a TitlePrefix to a JSON which can be sent to the server.
     */
    private convert(titlePrefix: TitlePrefix): TitlePrefix {
        const copy: TitlePrefix = Object.assign({}, titlePrefix);
        return copy;
    }
}
