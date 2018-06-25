import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoleMatchPro } from './role-match-pro.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoleMatchPro>;

@Injectable()
export class RoleMatchProService {

    private resourceUrl =  SERVER_API_URL + 'api/role-match-pros';

    constructor(private http: HttpClient) { }

    create(roleMatchPro: RoleMatchPro): Observable<EntityResponseType> {
        const copy = this.convert(roleMatchPro);
        return this.http.post<RoleMatchPro>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(roleMatchPro: RoleMatchPro): Observable<EntityResponseType> {
        const copy = this.convert(roleMatchPro);
        return this.http.put<RoleMatchPro>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoleMatchPro>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoleMatchPro[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoleMatchPro[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RoleMatchPro[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoleMatchPro = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoleMatchPro[]>): HttpResponse<RoleMatchPro[]> {
        const jsonResponse: RoleMatchPro[] = res.body;
        const body: RoleMatchPro[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoleMatchPro.
     */
    private convertItemFromServer(roleMatchPro: RoleMatchPro): RoleMatchPro {
        const copy: RoleMatchPro = Object.assign({}, roleMatchPro);
        return copy;
    }

    /**
     * Convert a RoleMatchPro to a JSON which can be sent to the server.
     */
    private convert(roleMatchPro: RoleMatchPro): RoleMatchPro {
        const copy: RoleMatchPro = Object.assign({}, roleMatchPro);
        return copy;
    }
}
