import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Invitee } from './invitee.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Invitee>;

@Injectable()
export class InviteeService {

    private resourceUrl =  SERVER_API_URL + 'api/invitees';

    constructor(private http: HttpClient) { }

    create(invitee: Invitee): Observable<EntityResponseType> {
        const copy = this.convert(invitee);
        return this.http.post<Invitee>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invitee: Invitee): Observable<EntityResponseType> {
        const copy = this.convert(invitee);
        return this.http.put<Invitee>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Invitee>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Invitee[]>> {
        const options = createRequestOption(req);
        return this.http.get<Invitee[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Invitee[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Invitee = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Invitee[]>): HttpResponse<Invitee[]> {
        const jsonResponse: Invitee[] = res.body;
        const body: Invitee[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Invitee.
     */
    private convertItemFromServer(invitee: Invitee): Invitee {
        const copy: Invitee = Object.assign({}, invitee);
        return copy;
    }

    /**
     * Convert a Invitee to a JSON which can be sent to the server.
     */
    private convert(invitee: Invitee): Invitee {
        const copy: Invitee = Object.assign({}, invitee);
        return copy;
    }
}
