import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { createRequestOption } from '../../../shared';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class MatchService {
    constructor(
        protected http: HttpClient,
    ) { }
    /* define url */
    private GET_ROLE_MATCHS = SERVER_API_URL + 'api/pro-requirements/pro-request';
    private GET_PRO_LIST = SERVER_API_URL + 'api/role-match-pros/pro-requirement';
    private UPDATE_PRO_DECSION = SERVER_API_URL + 'api/role-match-pros';

    private query(url, req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get(url, { params: options, observe: 'response' })
            .map((res: HttpResponse<any>) => { return res.body });
    }
    private find(url, id: number): Observable<any> {
        return this.http.get(`${url}/${id}`, { observe: 'response' })
            .map((res: HttpResponse<any>) => { return res.body });
    }

    private update(url, copy): Observable<any> {
        return this.http.put(url, copy, { observe: 'response' })
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

    getRoleMatchs(id) {
        return this.handleRequest(this.find(this.GET_ROLE_MATCHS, id));
    }

    getProList(id) {
        return this.handleRequest(this.find(this.GET_PRO_LIST, id));
    }

    updateProDecsion(bodyParam) {
        return this.handleRequest(this.update(this.UPDATE_PRO_DECSION, bodyParam));
    }
}
