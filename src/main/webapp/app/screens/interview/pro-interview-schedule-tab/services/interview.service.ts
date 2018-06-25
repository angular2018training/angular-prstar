import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class InterviewService {
  constructor(private http: HttpClient) {}
  
  public updateSchedule(copy): Observable<any> {
    return this.http.put('api/interview/schedule', copy, { observe: 'response' })
    .map((res: HttpResponse<any>) => { return res.body });
    }
}
