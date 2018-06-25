import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InvoiceTerm } from './invoice-term.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InvoiceTerm>;

@Injectable()
export class InvoiceTermService {

    private resourceUrl =  SERVER_API_URL + 'api/invoice-terms';

    constructor(private http: HttpClient) { }

    create(invoiceTerm: InvoiceTerm): Observable<EntityResponseType> {
        const copy = this.convert(invoiceTerm);
        return this.http.post<InvoiceTerm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoiceTerm: InvoiceTerm): Observable<EntityResponseType> {
        const copy = this.convert(invoiceTerm);
        return this.http.put<InvoiceTerm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InvoiceTerm>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InvoiceTerm[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoiceTerm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceTerm[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InvoiceTerm = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InvoiceTerm[]>): HttpResponse<InvoiceTerm[]> {
        const jsonResponse: InvoiceTerm[] = res.body;
        const body: InvoiceTerm[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InvoiceTerm.
     */
    private convertItemFromServer(invoiceTerm: InvoiceTerm): InvoiceTerm {
        const copy: InvoiceTerm = Object.assign({}, invoiceTerm);
        return copy;
    }

    /**
     * Convert a InvoiceTerm to a JSON which can be sent to the server.
     */
    private convert(invoiceTerm: InvoiceTerm): InvoiceTerm {
        const copy: InvoiceTerm = Object.assign({}, invoiceTerm);
        return copy;
    }
}
