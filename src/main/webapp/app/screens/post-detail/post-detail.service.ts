import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
// TODO
import { BaseEntity } from '../../shared';
import { createRequestOption } from '../../shared';
import { PostDTO } from './post-detail.model';

export type EntityResponseType = HttpResponse<PostDTO>;

@Injectable()
export class PostDetailService {

    private postResourceUrl = SERVER_API_URL + 'api/post-pro/';

    constructor(
        private http: HttpClient
    ) { }

    get(postId: string): Observable<HttpResponse<PostDTO>> {
        return this.http.get<PostDTO>(this.postResourceUrl + postId, { observe: 'response' })
            .map((res: HttpResponse<PostDTO>) => this.convertResponse(res));
    }

    private convertResponse(response: HttpResponse<PostDTO>): HttpResponse<PostDTO> {
        const body = this.convertItemResponse(response.body);
        return response.clone({body});
    }

    private convertItemResponse(item: PostDTO): PostDTO {
        const copy: PostDTO = Object.assign(item);
        return copy;
    }
}