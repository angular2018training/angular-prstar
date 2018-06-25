import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { Post, Pid } from './matching.model';
import { MatchReport } from '../../entities/match-report';
import { Pro } from '../../entities/pro/pro.model';
import { RoleMatch } from '../../entities/role-match/role-match.model';
import { BaseEntity } from "../../shared";

export type EntityResponseType = HttpResponse<Post>;

@Injectable()
export class MatchingService {

    // storing matching result
    matchReport: MatchReport;
    
    

    private postResourceUrl =  SERVER_API_URL + 'api/posts';
    private bidResourceUrl =  SERVER_API_URL + 'api/bids';
    private matchReportResourceUrl = SERVER_API_URL + 'api/match-reports';

    constructor(private http: HttpClient) {
    }

    unpiddedPosts(): Observable<HttpResponse<Post[]>> {
        return this.http.get<Post[]>(this.postResourceUrl + '/pro/unbid/', { observe: 'response' })
            .map((res: HttpResponse<Post[]>) => this.convertArrayResponse(res));
    }

    piddedPosts(): Observable<HttpResponse<Post[]>> {
        return this.http.get<Post[]>(this.postResourceUrl + '/pro/bid/', {  observe: 'response' })
            .map((res: HttpResponse<Post[]>) => this.convertArrayResponse(res));
    }

    cancelPid(postId: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.bidResourceUrl}/post/${postId}/`, { observe: 'response'});
    }

    pid(postId: number): Observable<HttpResponse<any>> {
        return this.http.get<Pid>(this.bidResourceUrl + `/post/${postId}`, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MatchReport>(`${this.matchReportResourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MatchReport = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Post[]>): HttpResponse<Post[]> {

        const jsonResponse: Post[] = res.body;
        const body: Post[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Post.
     */
    private convertItemFromServer(post: Post): Post {
        const copy: Post = Object.assign({}, post);
        return copy;
    }

}
