import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PostDTO } from './postsList.model';

export type EntityResponseType = HttpResponse<PostDTO>;

@Injectable()
export class PostsListService {

    private postResourceUrl =  SERVER_API_URL + 'api/posts';

    constructor(private http: HttpClient) { }

    posts(): Observable<HttpResponse<PostDTO[]>> {
        return this.http.get<PostDTO[]>(this.postResourceUrl + '/biz/', { observe: 'response' })
            .map((res: HttpResponse<PostDTO[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<PostDTO[]>): HttpResponse<PostDTO[]> {

        const jsonResponse: PostDTO[] = res.body;
        const body: PostDTO[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Post.
     */
    private convertItemFromServer(postDTO: PostDTO): PostDTO {
        const copy: PostDTO = Object.assign({}, postDTO);
        return copy;
    }
}
