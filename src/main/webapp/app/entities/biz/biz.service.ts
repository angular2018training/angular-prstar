import { DropDownItem } from './../../shared/model/dropdown-item.model';
import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Biz } from './biz.model';
import { createRequestOption } from '../../shared';
import { File } from './../../entities/file';
export type EntityResponseType = HttpResponse<Biz>;

@Injectable()
export class BizService {
    currentStep = 1;
    delegationType1 = false;
    delegationType2 = false;
    companyBioDelegate = false;
    contractsDelegate = false;
    error: boolean;
    @Input() biz;

    private resourceUrl = SERVER_API_URL + 'api/bizs';

    constructor(private http: HttpClient) {
        this.resetData();
    }

    create(biz: Biz): Observable<EntityResponseType> {
        const copy = this.convert(biz);
        return this.http.post<Biz>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(biz: Biz): Observable<EntityResponseType> {
        const copy = this.convert(biz);
        return this.http.put<Biz>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Biz>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByActivationKey(activationKey: string): Observable<EntityResponseType> {
        return this.http.get<Biz>(`${this.resourceUrl}/activation?activationKey=${activationKey}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByBizUser(email: string): Observable<EntityResponseType> {
        return this.http.get<Biz>(`${this.resourceUrl}/biz_by_email/${email}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByUserID(userId: number): Observable<EntityResponseType> {
        return this.http.get<Biz>(`${this.resourceUrl}/biz_user_id/${userId}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }
    // findWithAnyDataType(id: number): Observable<EntityResponseType> {
    //     return this.http.get<Biz>(`${this.resourceUrl}/${id}`, { observe: 'response' })
    //         .map((res: EntityResponseType) => this.convertResponse(res));
    // }

    query(req?: any): Observable<HttpResponse<Biz[]>> {
        const options = createRequestOption(req);
        return this.http.get<Biz[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Biz[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Biz = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Biz[]>): HttpResponse<Biz[]> {
        const jsonResponse: Biz[] = res.body;
        const body: Biz[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Biz.
     */
    private convertItemFromServer(biz: Biz): Biz {
        const copy: Biz = Object.assign({}, biz);
        return copy;
    }

    /**
     * Convert a Biz to a JSON which can be sent to the server.
     */
    private convert(biz: Biz): Biz {
        const copy: Biz = Object.assign({}, biz);
        return copy;
    }

    activationKey = '';

    public resetData() {
        this.biz = {
            jwtToken: '',
            id: null,
            bizUsers: [
                {
                    user: {
                        authorities: [],
                        login: "",
                        checkedAuthorities: []
                    }  
                }
            ],
            // in PUT method, we have to assign these values with the info got from POST method
            user: {
                titlePrefix: '',
                firstName: '',
                middleName: '',
                lastName: '',
                titleSuffix: '',
                login: '',
                email: '',
                password: '',
                confirmPassword: '',
                authorities: [],
                phones: [
                    {
                        type: [new DropDownItem(3, "Cell")],
                        number: ''
                    }
                ],
                street:'',
                city: {
                    name: '',
                    state: {
                        name: ''
                    }
                },
                latitude: 0,
                longitude: 0
            },
            companyName: '',
            website: '',
            companyBio: '',
            companyLogoFile: File,
            hqAddress: null,
            suit: '',
            street: '',
            city: {
                name: '',
                state: {}
            },
            industries: [],
            companySize: null,
            companySizeString: '',
            resourceNeeds: [],
            contractTemplates: [],
            bizRoleTypeId: 1
        
        }
    }
}
