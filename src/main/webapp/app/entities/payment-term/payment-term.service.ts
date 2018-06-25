import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PaymentTerm } from './payment-term.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PaymentTerm>;

@Injectable()
export class PaymentTermService {

    private resourceUrl =  SERVER_API_URL + 'api/payment-terms';

    constructor(private http: HttpClient) { }

    create(paymentTerm: PaymentTerm): Observable<EntityResponseType> {
        const copy = this.convert(paymentTerm);
        return this.http.post<PaymentTerm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(paymentTerm: PaymentTerm): Observable<EntityResponseType> {
        const copy = this.convert(paymentTerm);
        return this.http.put<PaymentTerm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PaymentTerm>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PaymentTerm[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaymentTerm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaymentTerm[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PaymentTerm = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PaymentTerm[]>): HttpResponse<PaymentTerm[]> {
        const jsonResponse: PaymentTerm[] = res.body;
        const body: PaymentTerm[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PaymentTerm.
     */
    private convertItemFromServer(paymentTerm: PaymentTerm): PaymentTerm {
        const copy: PaymentTerm = Object.assign({}, paymentTerm);
        return copy;
    }

    /**
     * Convert a PaymentTerm to a JSON which can be sent to the server.
     */
    private convert(paymentTerm: PaymentTerm): PaymentTerm {
        const copy: PaymentTerm = Object.assign({}, paymentTerm);
        return copy;
    }
}
