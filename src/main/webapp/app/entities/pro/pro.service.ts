import { Phone } from './../phone/phone.model';
import { Skill } from './../skill/skill.model';
import { Role } from './../role/role.model';
import { DropDownItem, DropDownItemProRole } from './../../shared/model/dropdown-item.model';
import { Address } from './../../shared/model/address';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL, TOKEN } from '../../app.constants';

import { Pro } from './pro.model';
import { createRequestOption, Invitee } from '../../shared';
import { validateConfig } from '@angular/router/src/config';
import { File } from './../file';

export type EntityResponseType = HttpResponse<Pro>;

@Injectable()
export class ProService {

    currentStep = 1;

    private resourceUrl = SERVER_API_URL + 'api/pros';

    error: boolean;

    dropdownSkillList = [];

    pro;

    contactData;
    backgroundData;
    bioSkillData;

    constructor(private http: HttpClient) {
        this.resetData();
    }

    create(pro: Pro): Observable<EntityResponseType> {
        const copy = this.convert(pro);
        return this.http.post<Pro>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateSummary(pro: Pro): Observable<EntityResponseType> {
        const copy = this.convert(pro);
        return this.http.put<Pro>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateDetail(pro: Pro): Observable<EntityResponseType> {
        const copy = this.convert(pro);
        return this.http.put<Pro>(`${this.resourceUrl}/detail`, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Pro>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByActivationKey(activationKey: string): Observable<EntityResponseType> {
        return this.http.get<Pro>(`${this.resourceUrl}/activation?activationKey=${activationKey}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findBySummaryActivationKey(activationKey: string): Observable<EntityResponseType> {
        return this.http.get<Pro>(`${this.resourceUrl}/activationSummary?activationKey=${activationKey}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }


    // getProByParameter(parameterName: string, value: string): Observable<HttpResponse<Pro[]>> {
    //     return this.http.get<Pro[]>(`${this.resourceUrl}?${parameterName}=${value}`, 
    //     {observe: 'response' })
    //         .map((res: HttpResponse<Pro[]>) => this.convertArrayResponse(res));
    //     // let apiURL = `${this.resourceUrl}?${parameterName}=${value}`;
    //     // return this.http.get(apiURL);
    // }

    getAllPros(): Observable<HttpResponse<Pro[]>> {
        //Hashcode for get 200 applicants
        return this.http.get<Pro[]>(`${this.resourceUrl}?size=200&sort=decision`,
            { observe: 'response' })
            .map((res: HttpResponse<Pro[]>) => this.convertArrayResponse(res));
        // let apiURL = `${this.resourceUrl}?${parameterName}=${value}`;
        // return this.http.get(apiURL);
    }

    query(req?: any): Observable<HttpResponse<Pro[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pro[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pro[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    /**
     * Get Information of an invitee via Token in email.
     * @param token token in email
     * @returns information of an invitee.
     */
    inviteeInformation(token: string): Observable<HttpResponse<Invitee>> {
        let options: HttpParams = new HttpParams();
        options = options.append(TOKEN, token);
        return this.http.get<Invitee>(`${this.resourceUrl}/invitees`, { params: options, observe: 'response' });
    }

    getCurrentLoginPro(): Observable<EntityResponseType> {
        return this.http.get<Pro>(`${this.resourceUrl}/currentLogin`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getAvatarCurrentLoginPro(): Observable<EntityResponseType> {
        return this.http.get<Pro>(`${this.resourceUrl}/avatar`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Pro = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Pro[]>): HttpResponse<Pro[]> {
        const jsonResponse: Pro[] = res.body;
        const body: Pro[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Pro.
     */
    private convertItemFromServer(pro: Pro): Pro {
        const copy: Pro = Object.assign({}, pro);
        return copy;
    }

    /**
     * Convert a Pro to a JSON which can be sent to the server.
     */
    private convert(pro: Pro): Pro {
        const copy: Pro = Object.assign({}, pro);
        return copy;
    }

    public resetData() {
        this.pro = {
            pictureFile: null,
            resume: null,
            summaryBio: "",
            lowDesiredRate: null,
            hightDesiredRate: null,
            account: {
                login: "",
                titlePrefix: null,
                firstName: "",
                middleName: null,
                lastName: "",
                titleSuffix: null,
                email: "",
                password: null,
                phones: [],
                bizDelegations: [],
                city: null,
                street: null,
                suit: null,
                latitude: 0,
                longitude: 0
            },
            roles: [],
            skills: []
        };

        this.contactData = {
            user:
                {
                    login: "",
                    password: "",
                    confirmPassword: "",
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    titleSuffix: "",
                    selectedPrefix: []
                },
            address: Address,
            phoneList:
                [
                    {
                        selectedPhoneType: [new DropDownItem(3, "Cell")],
                        phoneNumber: ""
                    }
                ]
        }

        this.backgroundData = {
            avatarPhoto: "",
            avatarPhotoContentType: "",
            avatarPhotoFileName: "",
            resume: "",
            resumeContentType: "",
            resumeFileName: "",
            freeAnswerQuestionList: [],
            checkboxAnswerQuestionList: [],
            acceptTerms: "",
            proIndustries: []
        }

        this.bioSkillData = {
            summaryBio: "",
            selectedRoles: [],
            skills: []
        };
    }

    public mapDataToGUI() {
        this.contactData.user = this.pro.account;
        this.bioSkillData.summaryBio = this.pro.summaryBio;
        this.bioSkillData.desiredRateLow = this.pro.lowDesiredRate;
        this.bioSkillData.desiredRateHigh = this.pro.hightDesiredRate;
        this.bioSkillData.selectedRoles = [];
        this.pro.roles.forEach(element => {
            this.bioSkillData.selectedRoles.push(new DropDownItemProRole(element.role.id, element.role.name, element.id, element.lowDesiredRate, element.highDesiredRate));
        });
        this.bioSkillData.skills = this.pro.skills.map(
            (item) => {
                item.skill = new DropDownItem(item.skill.id, item.skill.name);
                return item;
            }
        );
        if(this.pro.account.phones.length > 0){
            this.contactData.phoneList = [];
            this.pro.account.phones.forEach(item => {
                let selected = new DropDownItem(3, 'Cell');
                switch (item.type) {
                    case 'HOME':
                        selected = new DropDownItem(1, 'Home')
                        break;
                    case 'OFFICE':
                        selected = new DropDownItem(2, 'Office')
                        break;
                    case 'CELL':
                        selected = new DropDownItem(3, 'Cell')
                        break;
                    case 'OTHER':
                        selected = new DropDownItem(4, 'Other')
                        break;
                    default:
                        break;
                }
                this.contactData.phoneList.push({
                    selectedPhoneType: [selected],
                    phoneNumber: item.number
                });
            });
        }
    }

    mapGUIDataToDTO(): any {
        this.pro.account.phones = [];
        for (let item of this.contactData.phoneList) {
            if (item.selectedPhoneType.length > 0 && item.phoneNumber !== '') {
                let phone = new Phone();
                phone.id = item.id;
                phone.number = item.phoneNumber;
                phone.type = item.selectedPhoneType[0].itemName.toUpperCase();
                this.pro.account.phones.push(phone);
            }
        }

        if (this.contactData.user.selectedPrefix !== undefined && this.contactData.user.selectedPrefix.length > 0) {
            this.pro.account.titlePrefix = this.contactData.user.selectedPrefix[0].itemName.toUpperCase().replace('.', '');
        }

        // store background answers
        this.pro.backgroundQuestions = [];
        for (let item of this.backgroundData.freeAnswerQuestionList.
            concat(this.backgroundData.checkboxAnswerQuestionList)) {
            this.pro.backgroundQuestions.push({
                answer: item.proAnswer ? item.proAnswer : "false",
                questionId: item.id
            });
        }

        // store industry
        this.pro.proIndustries = [];
        this.backgroundData.proIndustries.forEach(element => {
            this.pro.proIndustries.push({
                industry: {
                    id: element.id,
                    name: element.itemName
                },
                yearsOfExperience: 0
            });
        });

        // store addresss
        let address = this.contactData.address;
        this.pro.account.street = address.streetNumber + ' ' + address.streetName;
        this.pro.account.city = {
            name: address.city,
            state: {
                name: address.state
            }
        };
        this.pro.account.latitude = address.latitude;
        this.pro.account.longitude = address.longitude;

        this.pro.summaryBio = this.bioSkillData.summaryBio;
        this.pro.lowDesiredRate = this.bioSkillData.desiredRateLow;
        this.pro.hightDesiredRate = this.bioSkillData.desiredRateHigh;

        this.pro.roles = [];
        this.bioSkillData.selectedRoles.forEach(item => {
            this.pro.roles.push({
                id: item.proRoleId,
                role: new Role(item.id, item.itemName),
                lowDesiredRate: item.lowRate,
                highDesiredRate: item.highRate
            });
        });

        this.pro.skills = [];
        for (let item of this.bioSkillData.skills) {
            this.pro.skills.push({
                id: item.id,
                strength: item.strength,
                yearsOfExperience: item.yearsOfExperience,
                skill: new Skill(item.skill.id, item.skill.itemName)
            });
        }

        this.pro.pictureFile = new File();
        this.pro.pictureFile.content = this.backgroundData.avatarPhoto;
        this.pro.pictureFile.contentType = this.backgroundData.avatarPhotoContentType;
        this.pro.pictureFile.name = this.backgroundData.avatarPhotoFileName;
        
        this.pro.resumeFile = new File();
        this.pro.resumeFile.content = this.backgroundData.resume;
        this.pro.resumeFile.contentType = this.backgroundData.resumeContentType;
        this.pro.resumeFile.name = this.backgroundData.resumeFileName;
    }

    public getReferralStatus(email: String): Observable<String> {
        return this.http.get<string>(`${this.resourceUrl}/${email}/decision`);
    }

    public resendAcceptedEmail(email: String): Observable<any>{
        return this.http.get<any>(`${this.resourceUrl}/${email}/decision/resend`, { observe: 'response' });
    }
}
