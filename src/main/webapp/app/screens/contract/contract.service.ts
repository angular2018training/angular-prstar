import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Contract } from './contract.model';
import { createRequestOption } from '../../shared';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type EntityResponseType = HttpResponse<Contract>;

@Injectable()
export class ContractService {

    private resourceUrl =  SERVER_API_URL + 'api/contracts';
    contract;
    datePipe: DatePipe;
    private contracId: number = -1;
    private contractIds = new BehaviorSubject<number>(this.contracId);

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    setIdContract(data) {
        this.contractIds.next(data);
      }
    getIdContract() {
        return this.contractIds;
    }
    create(contract: Contract): Observable<EntityResponseType> {
        const copy = this.convert(contract);
        return this.http.post<Contract>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(contract: Contract): Observable<EntityResponseType> {
        const copy = this.convert(contract);
        return this.http.put<Contract>('/api/contracts/change_request', copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    
    updateAcceptStatus(contract: Contract): Observable<EntityResponseType> {
        const copy = this.convertData(contract);
        return this.http.put<Contract>('/api/contracts/accept', copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateRejectStatus(contract: Contract): Observable<EntityResponseType> {
        const copy = this.convertData(contract);
        return this.http.put<Contract>('/api/contracts/reject', copy, { observe: 'response' })
            .map((res: EntityResponseType) => {
                return this.convertResponse(res)
            });
    }

    countInprocessStatus(req?: any): Observable<EntityResponseType> {
        const options = createRequestOption(req);
        return this.http.get<Contract>('/api/contracts/count_pending', { params: options, observe: 'response' })
            .map((res: HttpResponse<any>) => { return res.body });
    }

    countCompletedStatus(req?: any): Observable<EntityResponseType> {
        const options = createRequestOption(req);
        return this.http.get<Contract>('/api/contracts/count_accepted', { params: options, observe: 'response' })
            .map((res: HttpResponse<any>) => { return res.body });
    }

    countTemplateStatus(req?: any): Observable<EntityResponseType> {
        const options = createRequestOption(req);
        return this.http.get<Contract>('/api/contract/templates/count', { params: options, observe: 'response' })
            .map((res: HttpResponse<any>) => { return res.body });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Contract>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Contract[]>> {
        const options = createRequestOption(req);
        return this.http.get<Contract[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Contract[]>) => this.convertArrayResponse(res));
    }
    queryListPending(req?: any): Observable<HttpResponse<Contract[]>> {
        const options = createRequestOption(req);
        return this.http.get<Contract[]>('/api/contracts/list_pending', { params: options, observe: 'response' })
            .map((res: HttpResponse<Contract[]>) => this.convertArrayResponse(res));
    }

    queryListAccepter(req?: any): Observable<HttpResponse<Contract[]>> {
        const options = createRequestOption(req);
        return this.http.get<Contract[]>('/api/contracts/list_accepted', { params: options, observe: 'response' })
            .map((res: HttpResponse<Contract[]>) => this.convertArrayResponse(res));
    }

    queryById(contractId: number): Observable<HttpResponse<Contract>> {
        const options = createRequestOption();
        return this.http.get<Contract>(`${'/api/contracts'}/${contractId}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Contract>) => this.convertResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Contract = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Contract[]>): HttpResponse<Contract[]> {
        const jsonResponse: Contract[] = res.body;
        const body: Contract[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Contract.
     */
    private convertItemFromServer(contract: Contract): Contract {
        const copy: Contract = Object.assign({}, contract);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(contract.createdDate);
        return copy;
    }

    /**
     * Convert a Contract to a JSON which can be sent to the server.
     */
    private convert(contract: Contract): Contract {
        const copy: Contract = Object.assign({}, contract);
       // copy.createdDate = this.dateUtils.toDate(contract.createdDate);
        return copy;
    }

    private convertData(data: any): any {
        const copy: any = Object.assign({}, data);
       // copy.createdDate = this.dateUtils.toDate(contract.createdDate);
        return copy;
    }
}
