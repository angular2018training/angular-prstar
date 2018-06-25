import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { File } from './file.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<File>;

@Injectable()
export class FileService {

    private resourceUrl =  SERVER_API_URL + 'api/files';

    constructor(private http: HttpClient) { }

    create(file: File): Observable<EntityResponseType> {
        const copy = this.convert(file);
        return this.http.post<File>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(file: File): Observable<EntityResponseType> {
        const copy = this.convert(file);
        return this.http.put<File>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<File>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<File[]>> {
        const options = createRequestOption(req);
        return this.http.get<File[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<File[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    getDownloadFile(req?: any): Observable<Blob> {
        const options = createRequestOption(req);
        console.log("call api");
        // let options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(`${this.resourceUrl}/download`, { params: options, responseType: "blob"});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        console.log('response download file');
        console.log(res);
        const body: File = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<File[]>): HttpResponse<File[]> {
        const jsonResponse: File[] = res.body;
        const body: File[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to File.
     */
    private convertItemFromServer(file: File): File {
        const copy: File = Object.assign({}, file);
        return copy;
    }

    /**
     * Convert a File to a JSON which can be sent to the server.
     */
    private convert(file: File): File {
        const copy: File = Object.assign({}, file);
        return copy;
    }
}
