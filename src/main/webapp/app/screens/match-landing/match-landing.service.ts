import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { createRequestOption } from '../../shared';
import { finalize } from 'rxjs/operators';

@Injectable()
export class MatchLandingService {
    constructor(
        protected http: HttpClient,
    ) { }

    /* define url */
    private GET_BIZ_LANDING_DATA = SERVER_API_URL + 'api/posts-biz';
    private GET_PRO_LANDING_DATA = SERVER_API_URL + 'api/bids-pro';
    private GET_MATCH_REPORTS = SERVER_API_URL + 'api/pro-requests/current-user';

    private query(url, req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get(url, { params: options, observe: 'response' })
            .map((res: HttpResponse<any>) => { return res.body });
    }
    private find(url, id: number): Observable<any> {
        return this.http.get(`${url}/${id}`, { observe: 'response' })
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

    getBizLandingData() {
        return this.handleRequest(this.query(this.GET_BIZ_LANDING_DATA));
    }

    getProLandingData() {
        return this.handleRequest(this.query(this.GET_PRO_LANDING_DATA));
    }

    getMatchReports() {
        return this.handleRequest(this.query(this.GET_MATCH_REPORTS));
    }
}
