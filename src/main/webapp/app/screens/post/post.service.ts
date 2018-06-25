import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { JhiDateUtils } from 'ng-jhipster';
import { Post, Project, ProRequirement } from '../../shared';
declare var window: any;

export type EntityResponseType = HttpResponse<Post>;

@Injectable()
export class PostService {

    private resourceUrl =  SERVER_API_URL + 'api/posts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(post: Post): Observable<EntityResponseType> {
        const copy = this.convert(post);
        return this.http.post<Post>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }


    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Post = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Post.
     */
    private convertItemFromServer(post: Post): Post {
        const copy: Post = Object.assign({}, post);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(post.createdDate);
        return copy;
    }

    /**
     * Convert a Post to a JSON which can be sent to the server.
     */
    private convert(post: Post): Post {
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
