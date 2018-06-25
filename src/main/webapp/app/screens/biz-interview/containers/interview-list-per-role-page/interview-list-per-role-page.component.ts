import { ProjectCssUtil } from './../../../../shared/utils/project-css-class';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InterviewSession } from '../../models/interview-session.model';
import { InterviewScore } from '../../models/interview-score.model';
import { InterviewService } from '../../services/interview.service';
import { Project } from '../../models/project.model';
import { Interview } from '../../models/interview.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { Principal } from '../../../../shared';

@Component({
  selector: 'app-interview-list-per-role-page',
  templateUrl: './interview-list-per-role-page.component.html',
  styleUrls: ['./interview-list-per-role-page.component.scss']
})
export class InterviewListPerRolePageComponent implements OnInit, OnDestroy {
  private paramsSubs: Subscription;
  private subscription: Subscription;
  public roleId: number;
  public role: any;
  public project: any;
  public interview: any; // current interview
  public listInterview: any[] = [];
  public currentSession: number;
  public canGotoInterviewSummary: boolean = false;
  public countOfPros: number = 0;
  public countOfSaved: number = 0;
  // requestid
  public requestid: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private interviewService: InterviewService,
    private jhiAlertService: JhiAlertService,
    private principal: Principal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.onHandleParams();
    this.onHandleQueryParams();
  }

  /**
   * Get params on route
   * Call api get project data and role data
   */

  reciveRefresh(){
    this.loadData();
  }

  onHandleParams() {
    this.paramsSubs = this.activatedRoute.params.subscribe(params => {
      this.roleId = params['roleId'];
      if (this.roleId) {
        this.subscription = this.interviewService
          .getProjectByProRequirement(this.roleId)
          .subscribe(
            data => {
              this.project = data.body;
              console.log('project: ', this.project);
              if (this.project) {
                this.onHandleCountBidOrMatch();
              }
            },
            (res: HttpErrorResponse) => {
              this.onError(res.message);
            }
          );
        this.onGetInterviewByRole(this.roleId);
      }
    });
  }

  onHandleQueryParams() {
    this.paramsSubs = this.activatedRoute.queryParams.subscribe(queryParams => {
      this.requestid = queryParams['requestid'];
    });
  }

  gotoMatchOrBid(index) {
    if (this.project.postId) {
      // bid
      this.router.navigate(['/bid-common-individual'], {
        queryParams: {
          roleID: this.roleId,
          tab: (index-1),
          postId: this.project.postId
        }
      });
    } else {
      this.router.navigate(['/match-common-individual'], {
        queryParams: {
          roleid: this.roleId,
          requestid: this.requestid ? this.requestid : this.project.proRequestId,
          index: index
        }
      });
    }
  }

  onHandleCountBidOrMatch() {
    this.subscription = this.interviewService
      .getCountBidOrMatch(this.roleId, this.project.postId != null)
      .subscribe(data => {
        console.log(`${this.project.postId ? 'bid' : 'match'} :`, data);
        const arrData = data.body;
        this.countOfPros = arrData.length;
        this.countOfSaved = 0;
        arrData.forEach(item => {
          if (item.status === 'SAVED' || item.status === 'SAVE') {
            this.countOfSaved++;
          }
        });
      });
  }

  /**
   *
   * TODO: get one by role
   *
   */

  onGetInterviewByRole(roleId) {
    this.subscription = this.interviewService
      .getInterviewByRole(roleId)
      .subscribe(
        (res: HttpResponse<any>) => {
          if (res.body && res.body.length > 0) {
            this.listInterview = res.body;
            this.interview = this.listInterview[0];
            this.currentSession = this.interview.interviewSessions[0];
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

  private onError(error) {
    this.jhiAlertService.error(error.mesage, null, null);
  }

  onSave(data) {
    console.log('data emit: ', data);
    this.saveOrNext(data);
  }

  onNext(data) {
    console.log('data emit: ', data);
    this.saveOrNext(data);
    let index = this.interview.interviewSessions.findIndex(item => {
      return item.id === data.id;
    });
    console.log('session no :', index + 1);
    if (index + 1 < this.interview.interviewSessions.length) {
      this.currentSession = this.interview.interviewSessions[index + 1];
    } else {
      console.log('Last session!');
      this.gotoInterviewSummary();
    }
  }

  saveOrNext(value) {
    this.subscription = this.interviewService
      .updateInterviewSession(value)
      .subscribe(
        (data: any) => {
          console.log('save or next : ', data);
          let count = 0;
          let i = 0;
          this.interview.interviewSessions.forEach((session, index) => {
            if (session.decision === 'GO' && session.id !== data.body.id) {
              count++;
            }
          });
          if (
            count === this.interview.interviewSessions.length - 1 &&
            data.body.decision === 'GO'
          ) {
            this.interview.status = 'COMPLETED';
            this.gotoInterviewSummary();
          }
        },
        (res: HttpErrorResponse) => {
          this.onError(res.message);
        }
      );
  }

  onChangeCurrentSession(sessionSelected) {
    this.currentSession = sessionSelected;
    this.canGotoInterviewSummary = false;
  }

  setCurrentInterview(currentInterviewSelectedOutput) {
    console.log('Change current interview: ', currentInterviewSelectedOutput);
    this.interview = currentInterviewSelectedOutput;
    this.currentSession = currentInterviewSelectedOutput.interviewSessions[0];
  }

  setActive(currentSession, session) {
    let cssClasses;
    if (this.canGotoInterviewSummary) {
      cssClasses = {};
    } else {
      if (currentSession.interviewType === session.interviewType) {
        cssClasses = {
          active: true
        };
      } else {
        cssClasses = {};
      }
    }
    return cssClasses;
  }

  gotoInterviewSummary() {
    if (
      this.interview.status === 'COMPLETED' ||
      this.interview.status === 'ACCEPTED' ||
      this.interview.status === 'DECLINED' ||
      this.interview.status === 'PENDING_OFFER'
    ) {
      this.principal.identity().then(account => {
        const currentUserLoggedInId = account.id;
        console.log('current login id: ', currentUserLoggedInId);
        if (currentUserLoggedInId === this.interview.createdBy.id) {
          this.canGotoInterviewSummary = true;
        }
      });
    }
  }

  onHandleApprove(data) {
    this.interviewService
      .approveOffer({
        id: this.interview.id,
        approved: data
      })
      .subscribe(
        (res: HttpResponse<any>) => {
          data ? console.log('accepted') : console.log('passed');
          if (res) {
            this.loadData();
          }
        },
        (res: HttpErrorResponse) => {
          return this.onError(res.message);
        }
      );
  }

  onPrevious(session) {
    this.currentSession = this.interview.interviewSessions[
      this.interview.interviewSessions.length - 1
    ];
    this.canGotoInterviewSummary = false;
  }

  setStatusClasses(status) {
    ProjectCssUtil.setStatusClasses(status);
  }

  ngOnDestroy() {
    if (this.paramsSubs) {
      this.paramsSubs.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
