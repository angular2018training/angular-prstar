import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ProRequest } from './../../entities/pro-request/pro-request.model';
import { createRequestOption } from '../../shared';

import { Post, Project, ProRequirement } from '../../shared';

export type EntityResponseType = HttpResponse<ProRequest>;

declare var window: any;

@Injectable()
export class ProRequestService {

    private resourceUrl = SERVER_API_URL + 'api/pro-requests';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(proRequest: ProRequest): Observable<EntityResponseType> {
        const copy = this.convertFromPost(proRequest);
        return this.http.post<ProRequest>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createProRequestFromPost(post: Post){
        const copy = this.convertFromPost(post);
        return this.http.post<ProRequest>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(proRequest: ProRequest): Observable<EntityResponseType> {
        const copy = this.convert(proRequest);
        return this.http.put<ProRequest>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProRequest[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProRequest[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProRequest = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<ProRequest[]>): HttpResponse<ProRequest[]> {
        const jsonResponse: ProRequest[] = res.body;
        const body: ProRequest[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to ProRequest.
     */
    private convertItemFromServer(proRequest: ProRequest): ProRequest {
        const copy: ProRequest = Object.assign({}, proRequest);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(proRequest.createdDate);
        return copy;
    }

    /**
     * Convert a ProRequest to a JSON which can be sent to the server.
     */
    private convert(proRequest: ProRequest): ProRequest {
        const copy: ProRequest = Object.assign({}, proRequest);

        copy.createdDate = this.dateUtils.toDate(proRequest.createdDate);
        return copy;
    }

    /**
     * Convert a Post to a JSON (following ProRequest) which can be sent to the server.
     */
    private convertFromPost(post: Post): Post {
        const copy: Post = Object.assign({}, post);
        copy.project = this.convertProject(post.project);
        copy.createdDate = this.dateUtils.toDate(post.createdDate);
        /**
         * Covert Date of ProRequirements
         */
        const proRequirements: ProRequirement[] = [];
        for (let i = 0; i < post.proRequests.length; i++) {
            // Covert Date.
            proRequirements.push(this.convertProRequirement(post.proRequests[i]));
        }
        copy.proRequests = proRequirements;

        return copy;
    }


    /**
     * Convert a Project to a JSON which can be sent to the server.
     */
    private convertProject(project: Project): Project {
        const copy: Project = Object.assign({}, project);
        copy.startDate = window.convertDate(project.startDate);
        copy.endDate = window.convertDate(project.endDate);

        return copy;
    }
    /**
     * Convert a ProRequirement to a JSON which can be sent to the server.
     */
    private convertProRequirement(proRequirement: ProRequirement): ProRequirement {
        const copy: ProRequirement = Object.assign({}, proRequirement);

        copy.startDate = window.convertDate(proRequirement.startDate);
        copy.endDate = window.convertDate(proRequirement.endDate);
        copy.bidDeadline = window.convertDate(proRequirement.bidDeadline);
        copy.decisionDate = window.convertDate(proRequirement.decisionDate);
        return copy;
    }
}
