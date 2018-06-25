import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import { createRequestOption } from '../../../shared';
import { finalize } from 'rxjs/operators';

@Injectable()
export class BidUserService {
    constructor(
        protected http: HttpClient,
    ) { }

    /* define url */
    private GET_BID_USER_DATA = SERVER_API_URL + 'api/bids-user';
    private BID_USER_LIST_URL = SERVER_API_URL + '/api/bids-biz';
    private PRO_REQUIREMENT_DETAIL_URL = SERVER_API_URL + '/api/pro-requirements-biz';
    private CREATE_INVITATION = SERVER_API_URL + '/api/interviews';

    private query(url, req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get(url, { params: options, observe: 'response' })
            .map((res: HttpResponse<any>) => { return res.body });
    }
    private find(url, id: number): Observable<any> {
        return this.http.get(`${url}/${id}`, { observe: 'response' })
            .map((res: HttpResponse<any>) => { return res.body });
    }

    private createInvitaion(data: any): Observable<any> {
        return this.http.post<any>(this.CREATE_INVITATION, data, { observe: 'response' })
            .map((res: HttpResponse<any>) => { return res.body });
    }


    private handleRequest(requsetFn: Observable<any>) {
        // show loading
        return requsetFn.pipe(
            finalize(() => {
                // hide loading
            })
        );
    }

    getBidUserDataSingle(id) {
        return this.handleRequest(this.find(this.GET_BID_USER_DATA, id));
    }

    getBidUserDataListByProRequirement(proRequirementID) {
        return this.handleRequest(this.find(this.BID_USER_LIST_URL, proRequirementID));
    }

    getProRequirementDetailSingle(proRequirementID) {
        return this.handleRequest(this.find(this.PRO_REQUIREMENT_DETAIL_URL, proRequirementID));
    }

    sendInvitation(invitation: any) {
        return this.handleRequest(this.createInvitaion(invitation));
    }
    
}
