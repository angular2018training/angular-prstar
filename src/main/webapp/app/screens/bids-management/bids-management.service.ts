import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { createRequestOption } from '../../shared';
import { finalize } from 'rxjs/operators';

@Injectable()
export class BidsManagementService {
    constructor(
        protected http: HttpClient,
    ) { }
    /* define url */
    private GET_POST_LIST = SERVER_API_URL + 'api/posts';
    private GET_ROLE_LIST = SERVER_API_URL + '/api/post-biz';
    private GET_PROJECT_DETAIL = SERVER_API_URL + 'api/projects';

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

    /* get role list */
    getRoleList(id) {
        return this.handleRequest(this.find(this.GET_ROLE_LIST, id));
    }

    /* get post list */
    getPostList(id) {
        return this.handleRequest(this.query(this.GET_POST_LIST));
    }

    /* get project detail */
    getProjectDetail(id) {
        return this.handleRequest(this.find(this.GET_PROJECT_DETAIL, id));
    }
}
