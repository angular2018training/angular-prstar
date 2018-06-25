import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { InterviewService } from './../biz-interview/services/interview.service';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../entities/project';
import { ProjectDTO } from '../biz-interview/models/project.model';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'jhi-pro-interview',
  templateUrl: './pro-interview.component.html',
  styles: []
})
export class ProInterviewComponent implements OnInit {

  listInterview;
  interview;
  currentSession;

  constructor(
    private interviewService: InterviewService,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.route.queryParams.subscribe((params) => {
      let roleId = params['roleId'];
      if (roleId) {
        this.onGetInterviewByRole(roleId);
      }
    });
  }

  ngOnInit() {

  }

  reciveRefresh(){
    this.route.queryParams.subscribe((params) => {
      let roleId = params['roleId'];
      if (roleId) {
        this.onGetInterviewByRole(roleId);
      }
    });
  }

  onGetInterviewByRole(roleId) {
    this.interviewService
      .getInterviewByRole(roleId)
      .subscribe(
        (res: HttpResponse<any>) => {
          if (res.body && res.body.length > 0) {
            this.listInterview = res.body;
            this.interview = this.listInterview[0];
            // calc start end time
            this.interview.interviewSessions.forEach(session => {
              if (session.fromTime) {
                let timers = session.fromTime.split(':');
                let mins = Number(timers[1]) + session.duration;
                let h = Math.floor(mins / 60);
                let remainMins = mins % 60;
                timers[0] = Number(timers[0]) + h;
                timers[1] = remainMins;
                session.endTime = timers[0] + ':' + timers[1];
              }
            });

            this.currentSession = this.interview.interviewSessions[0];
            this.interviewService.currentInterview = this.interview;
            console.log('interviews : ', this.listInterview);
            console.log('current interview: ', this.interview);
            console.log('current session: ', this.currentSession);
          }
        },
        (res: HttpErrorResponse) => {
          this.onError(res.message);
        }
      );
  }

  onError(msg) {

  }

}
