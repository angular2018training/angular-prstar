import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ScheduleInterview } from './schedule-interview.model';
import { createRequestOption } from '../../shared';
import { tap, finalize } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<ScheduleInterview>;

@Injectable()
export class ScheduleInterviewService {

    public bidID: number;
    public currentLoginID: number;

    private resourceUrl =  SERVER_API_URL + 'api/bid-change-request-histories';

    constructor(private http: HttpClient) { }

    create(changeRequest: ScheduleInterview): Observable<EntityResponseType> {
        const copy = this.convert(changeRequest);
        return this.http.post<ScheduleInterview>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(changeRequest: ScheduleInterview): Observable<EntityResponseType> {
        const copy = this.convert(changeRequest);
        return this.http.put<ScheduleInterview>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ScheduleInterview>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ScheduleInterview[]>> {
        const options = createRequestOption(req);
        return this.http.get<ScheduleInterview[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ScheduleInterview[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ScheduleInterview = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ScheduleInterview[]>): HttpResponse<ScheduleInterview[]> {
        const jsonResponse: ScheduleInterview[] = res.body;
        const body: ScheduleInterview[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to changeRequest.
     */
    private convertItemFromServer(changeRequest: ScheduleInterview): ScheduleInterview {
        const copy: ScheduleInterview = Object.assign({}, changeRequest);
        return copy;
    }

    /**
     * Convert a changeRequest to a JSON which can be sent to the server.
     */
    private convert(changeRequest: ScheduleInterview): ScheduleInterview {
        const copy: ScheduleInterview = Object.assign({}, changeRequest);
        return copy;
    }

    private CREATE_INVITATION = SERVER_API_URL + '/api/interviews';
    private BIZ_USERS = SERVER_API_URL + '/api/users/bizs/current-user';
    private CHECK_INTERVIEW = SERVER_API_URL + '/api/interviews/pro_role';

    private queryList(url, req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get(url, { params: options, observe: 'response' })
            .map((res: HttpResponse<any>) => { return res.body });
    }

    private queryWithURL(url, req?: any): Observable<HttpResponse<ScheduleInterview[]>> {
        const options = createRequestOption(req);
        return this.http.get(url, { params: options, observe: 'response' })
            .map((res: HttpResponse<ScheduleInterview[]>) => this.convertArrayResponse(res));
    }

    private createInvitaion(data: ScheduleInterview): Observable<EntityResponseType> {
        const copy = this.convert(data);
        return this.http.post<ScheduleInterview>(this.CREATE_INVITATION, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private handleRequestPost(requsetFn: Observable<EntityResponseType>) {
        // show loading
        return requsetFn.pipe(
            finalize(() => {
                // hide loading
            })
        );
    }

    private handleRequestArray(requsetFn: Observable<HttpResponse<ScheduleInterview[]>>) {
        // show loading
        return requsetFn.pipe(
            finalize(() => {
                // hide loading
            })
        );
    }


    private handleRequest(requsetFn: Observable<any>) {
        // show loading
        return requsetFn.pipe(
            finalize(() => {
                // hide loading
            })
        );
    }

    sendInvitation(invitation: any) {
        return this.handleRequestPost(this.createInvitaion(invitation));
    }

    getListInterviewer() {
        return this.handleRequest(this.queryList(this.BIZ_USERS));
    }

    checkInterviewCreated(proId: number, roleId: number) {
        let param = {
            proID: proId,
            roleID: roleId
        };
        return this.handleRequestArray(this.queryWithURL(this.CHECK_INTERVIEW, param));
    }
}
