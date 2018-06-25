import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { User } from './user.model';
import { createRequestOption } from '../model/request-util';

@Injectable()
export class UserService {
    private resourceUrl = SERVER_API_URL + 'api/users';

    constructor(private http: HttpClient) { }

    create(user: User): Observable<HttpResponse<User>> {
        return this.http.post<User>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: User): Observable<HttpResponse<User>> {
        return this.http.put<User>(this.resourceUrl, user, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<User>> {
        return this.http.get<User>(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<User[]>> {
        const options = createRequestOption(req);
        return this.http.get<User[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
    queryGetById(roleId: number): Observable<HttpResponse<User[]>> {
        const options = createRequestOption();
        return this.http.get<User[]>(`${'/api/user/pro_by_role'}/${roleId}`, { params: options, observe: 'response' })
        .map((res: HttpResponse<User[]>) => this.convertArrayResponse(res));
    }

    queryGetProById(projectId: number, roleId: number): Observable<HttpResponse<User[]>> {
        const options = createRequestOption();
        return this.http.get<User[]>(`${'/api/user/pro_by_role'}/${projectId}/${roleId}`, { params: options, observe: 'response' })
        .map((res: HttpResponse<User[]>) => this.convertArrayResponse(res));
    }
    
    private convertArrayResponse(res: HttpResponse<User[]>): HttpResponse<User[]> {
        const jsonResponse: User[] = res.body;
        const body: User[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Role.
     */
    private convertItemFromServer(user: User): User {
        const copy: User = Object.assign({}, user);
        return copy;
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
    }

    findByEmail(email: string): Observable<any> {
        return this.http.post(`${this.resourceUrl}/emails`, email);
    }
    validateEmail(email: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.resourceUrl}/emails/${email}/validate`);
    }

}
