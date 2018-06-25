import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProNetwork } from './pro-network.model';
import { Referral } from './pro-referral.model';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class ProNetworkService {
  private resourceUrl =  SERVER_API_URL + 'api/pros/pro-network';

  constructor(
    private http: HttpClient
  ) { }

  getProNetwork(id: number): Observable<ProNetwork> {
    return this.http.get<ProNetwork>(this.resourceUrl);
  }

  getListReferralStatus(): Observable<Referral[]> {
    return this.http.get<Referral[]>(`${this.resourceUrl}/referral-status`)
  }

}
