import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { JhiDateUtils } from 'ng-jhipster';

import { Dummy } from './dummy.model';

export type EntityResponseType = HttpResponse<Dummy>;

@Injectable()
export class DummyService {

    private resourceUrl =  SERVER_API_URL + 'api/dummy';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }
}
