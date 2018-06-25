import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { PostWallDTO } from './postWall.model';
import { BaseEntity } from './../../shared';
import { createRequestOption } from '../../shared';
import { CriteriaDTO } from './postWall.model';

export type EntityResponseType = HttpResponse<PostWallDTO>;

@Injectable()
export class PostWallService {

    private postResourceUrl =  SERVER_API_URL + 'api/posts-email';

    constructor(private http: HttpClient) { }

    get(): Observable<HttpResponse<PostWallDTO[]>> {
        return this.http.get<PostWallDTO[]>(this.postResourceUrl, { observe: 'response' })
            .map((res: HttpResponse<PostWallDTO[]>) => this.convertArrayResponse(res));
    }

    search(criteria: CriteriaDTO): Observable<HttpResponse<PostWallDTO[]>> {
        const copy: CriteriaDTO = Object.assign({}, criteria);
        console.log(copy);
        return this.http.post<CriteriaDTO>(this.postResourceUrl, copy, { observe: 'response' })
            .map((res: HttpResponse<CriteriaDTO>) => this.convertResponse(res));
    }

    private convertArrayResponse(response: HttpResponse<PostWallDTO[]>): HttpResponse<PostWallDTO[]> {

        const jsonResponse: PostWallDTO[] = response.body;
        const body: PostWallDTO[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemResponse(jsonResponse[i]));
        }
        return response.clone({body});
    }

    private convertResponse(res: any): HttpResponse<PostWallDTO[]> {
        const jsonResponse: PostWallDTO[] = res.body;
        const body: PostWallDTO[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemResponse(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertItemResponse(item: PostWallDTO): PostWallDTO {
        const copy: PostWallDTO = Object.assign(item);
        return copy;
    }
}



