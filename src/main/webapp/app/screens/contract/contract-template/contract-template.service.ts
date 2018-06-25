import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ContractTemplate } from './contract-template.model';
import { createRequestOption } from '../../../shared';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export type EntityResponseType = HttpResponse<ContractTemplate>;

@Injectable()
export class ContractTemplateService {

    private resourceUrl =  SERVER_API_URL + '/api/contract/templates';
    
    constructor(private http: HttpClient, private dateUtils: JhiDateUtils, private modalService: NgbModal) { }

    create(contractTemplate: ContractTemplate): Observable<EntityResponseType> {
        const copy = this.convert(contractTemplate);
        return this.http.post<ContractTemplate>('/api/contract/template', copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(contractTemplate: ContractTemplate): Observable<EntityResponseType> {
        const copy = this.convert(contractTemplate);
        return this.http.put<ContractTemplate>('/api/contract/template', copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ContractTemplate>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ContractTemplate[]>> {
        const options = createRequestOption(req);
        return this.http.get<ContractTemplate[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ContractTemplate[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${'api/contract/template'}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ContractTemplate = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ContractTemplate[]>): HttpResponse<ContractTemplate[]> {
        const jsonResponse: ContractTemplate[] = res.body;
        const body: ContractTemplate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ContractTemplate.
     */
    private convertItemFromServer(contractTemplate: ContractTemplate): ContractTemplate {
        const copy: ContractTemplate = Object.assign({}, contractTemplate);
        // copy.name = this.dateUtils
        //     .convertDateTimeFromServer(contractTemplate.name);
        // copy.createdDate = this.dateUtils
        //     .convertDateTimeFromServer(contractTemplate.createdDate);
        return copy;
    }

    /**
     * Convert a ContractTemplate to a JSON which can be sent to the server.
     */
    private convert(contractTemplate: ContractTemplate): ContractTemplate {
        const copy: ContractTemplate = Object.assign({}, contractTemplate);

        //copy.name = this.dateUtils.toDate(contractTemplate.name);

        //copy.createdDate = this.dateUtils.toDate(contractTemplate.createdDate);
        return copy;
    }


  
 
}
