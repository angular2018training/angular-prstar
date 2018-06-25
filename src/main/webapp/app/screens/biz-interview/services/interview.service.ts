import {
  InterviewProNote,
  OfferDecision
} from './../../interview/model/interview-pro.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import { Interview } from './../models/interview.model';
import { createRequestOption } from '../../../shared';
import { ProjectDTO, Project } from '../models/project.model';
import { BehaviorSubject } from 'rxjs';

export type EntityResponseType = HttpResponse<Interview>;

@Injectable()
export class InterviewService {
  private resourceUrl = SERVER_API_URL + 'api/interviews';
  private proNoteResourceUrl = SERVER_API_URL + 'api/interview/pro-note';
  private approveOfferResourceUrl =
    SERVER_API_URL + 'api/interviews/final-result';
  private resourceProjectUrl = SERVER_API_URL + 'api/projects';
  private resourceInterviewSessionUrl =
    SERVER_API_URL + 'api/interview-sessions';
  private resourceBidResourceUrl = SERVER_API_URL + 'api/bids-biz';
  private resourceMatchUrl =
    SERVER_API_URL + 'api/role-match-pros/pro-requirement';
  private projectByRoleResourceUrl =
    SERVER_API_URL + 'api/projects/pro_requirement/';

  interviewList = [];
  proRequestInterviewList = [];
  currentInterview;
  currentProject;

  private listRoleOfProject: any[] = [];
  private listRoleOfProjectDataSource = new BehaviorSubject<any>(
    this.listRoleOfProject
  );

  private role: any = {};
  private roleDataSource = new BehaviorSubject<any>(this.role);

  constructor(private http: HttpClient) {}

  setListRoleOfProject(data) {
    this.listRoleOfProjectDataSource.next(data);
  }

  getListRoleOfProject() {
    return this.listRoleOfProjectDataSource;
  }

  setRole(data) {
    this.roleDataSource.next(data);
  }

  getRole() {
    return this.roleDataSource;
  }

  updateInterviewSession(data: any): Observable<EntityResponseType> {
    const copy = this.convertData(data);
    return this.http
      .put<any>(this.resourceInterviewSessionUrl, copy, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertAnyResponse(res));
  }

  getInterviewByRole(roleId) {
    return this.http
      .get<any>(`${this.resourceUrl}/interviewOfProRequirement/${roleId}`, {
        observe: 'response'
      })
      .map((res: HttpResponse<any[]>) => {
        return this.convertArrayResponse(res);
      });
  }

  getExistedInterviews() {
    return this.http
      .get<any>(`${this.resourceProjectUrl}/existed-interview`, {
        observe: 'response'
      })
      .map((res: HttpResponse<ProjectDTO[]>) => {
        return this.convertArrayResponse(res);
      });
  }

  create(interview: Interview): Observable<EntityResponseType> {
    const copy = this.convert(interview);
    return this.http
      .post<Interview>(this.resourceUrl, copy, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  update(interview: Interview): Observable<EntityResponseType> {
    const copy = this.convert(interview);
    return this.http
      .put<Interview>(this.resourceUrl, copy, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  updateInterviewProNote(
    interviewProNote: InterviewProNote
  ): Observable<EntityResponseType> {
    const copy = this.convert(interviewProNote);
    return this.http
      .put<InterviewProNote>(this.proNoteResourceUrl, copy, {
        observe: 'response'
      })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  approveOffer(offerDecision: OfferDecision): Observable<EntityResponseType> {
    const copy = this.convert(offerDecision);
    return this.http
      .put<OfferDecision>(this.approveOfferResourceUrl, copy, {
        observe: 'response'
      })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<Interview>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  query(req?: any): Observable<HttpResponse<Interview[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<Interview[]>(this.resourceUrl, {
        params: options,
        observe: 'response'
      })
      .map((res: HttpResponse<Interview[]>) => this.convertArrayResponse(res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {
      observe: 'response'
    });
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: Interview = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertAnyResponse(res: EntityResponseType): EntityResponseType {
    const body: any = this.convertItemAnyFromServer(res.body);
    return res.clone({ body });
  }

  private convertArrayResponse(
    res: HttpResponse<Interview[]>
  ): HttpResponse<Interview[]> {
    const jsonResponse: Interview[] = res.body;
    const body: Interview[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object to Interview.
   */
  private convertItemFromServer(interview: Interview): Interview {
    const copy: Interview = Object.assign({}, interview);
    return copy;
  }

  /**
   * Convert a returned JSON object to any.
   */
  private convertItemAnyFromServer(data: any): any {
    const copy: any = Object.assign({}, data);
    return copy;
  }

  /**
   * Convert a returned JSON object to Project.
   */

  private convertArrayProjectResponse(
    res: HttpResponse<ProjectDTO[]>
  ): HttpResponse<ProjectDTO[]> {
    const jsonResponse: ProjectDTO[] = res.body;
    const body: ProjectDTO[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertProjectDTOFromServer(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  private convertProjectDTOFromServer(projectDTO: ProjectDTO): ProjectDTO {
    const copy: ProjectDTO = Object.assign({}, projectDTO);
    return copy;
  }

  /**
   * Convert a Interview to a JSON which can be sent to the server.
   */
  private convert(interview: Interview): Interview {
    const copy: Interview = Object.assign({}, interview);
    return copy;
  }

  private convertData(data: any): any {
    const copy: any = Object.assign({}, data);
    return copy;
  }

  public updateSchedule(copy): Observable<any> {
    return this.http
      .put('api/interview/schedule', copy, { observe: 'response' })
      .map((res: HttpResponse<any>) => {
        return res.body;
      });
  }

  public getCountBidOrMatch(roleId, isPost: boolean): Observable<any> {
    if (isPost) {
      return this.http
        .get<any>(`${this.resourceBidResourceUrl}/${roleId}`, {
          observe: 'response'
        })
        .map((res: HttpResponse<any[]>) => {
          return res;
        });
    } else {
      return this.http
        .get<any>(`${this.resourceMatchUrl}/${roleId}`, {
          observe: 'response'
        })
        .map((res: HttpResponse<any[]>) => {
          return res;
        });
    }
  }

  getProjectByProRequirement(id): Observable<HttpResponse<Project>> {
    return this.http
      .get<Project>(`${this.projectByRoleResourceUrl}/${id}`, {
        observe: 'response'
      })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }
}
