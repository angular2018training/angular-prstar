import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CompanySize } from './company-size.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CompanySize>;

@Injectable()
export class CompanySizeService {

    private resourceUrl =  SERVER_API_URL + 'api/company-sizes';

    constructor(private http: HttpClient) { }

    create(companySize: CompanySize): Observable<EntityResponseType> {
        const copy = this.convert(companySize);
        return this.http.post<CompanySize>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(companySize: CompanySize): Observable<EntityResponseType> {
        const copy = this.convert(companySize);
        return this.http.put<CompanySize>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CompanySize>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CompanySize[]>> {
        const options = createRequestOption(req);
        return this.http.get<CompanySize[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CompanySize[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CompanySize = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CompanySize[]>): HttpResponse<CompanySize[]> {
        const jsonResponse: CompanySize[] = res.body;
        const body: CompanySize[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CompanySize.
     */
    private convertItemFromServer(companySize: CompanySize): CompanySize {
        const copy: CompanySize = Object.assign({}, companySize);
        return copy;
    }

    /**
     * Convert a CompanySize to a JSON which can be sent to the server.
     */
    private convert(companySize: CompanySize): CompanySize {
        const copy: CompanySize = Object.assign({}, companySize);
        return copy;
    }
}
