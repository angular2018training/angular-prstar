import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';

import { MatchService } from './match-bid-common.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { InterviewService } from '../../biz-interview/services/interview.service';

@Component({
  selector: 'jhi-match-common-individual',
  templateUrl: './match-common-individual.component.html',
  styles: [`.search-results {
    height: 20rem;
    overflow: scroll;
  }
  .avatar-size {
    height: 50px;
    width: 50px;
  }
  .rounded-image {
    border-radius: 50%;
  }
  `]
})
export class MatchCommonIndividualComponent implements OnInit {
  roleId = this.activatedRoute.snapshot.queryParams['roleid'];
  requestId = this.activatedRoute.snapshot.queryParams['requestid'];
  index = this.activatedRoute.snapshot.queryParams['index'];

  projectInfo: any;
  selectedTab = this.index ? this.index : 1;
  numberOfPro =  0;
  numberOfProSaved =  0;
  numberOfProInterview = 0;
  roleMatch = {
    roleName: 'Role Temp #1',
    status: 'Open'
  }
  projectMatch = {}
  subscription: Subscription;


  @ViewChild('yourChild') child;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matchService: MatchService,
    private interviewService: InterviewService,
    private jhiAlertService: JhiAlertService
  ) {
    
  }

  ngOnInit() {
    console.log('ngOnInit');
    
    this.getProjectDetail();
    this.onGetInterviewByRole(this.roleId);
  }

  viewProList() {
    this.selectedTab = 1;
    this.child.viewProList();
  }
     
  viewSavedProList() {
    this.selectedTab = 2;
    this.child.viewSavedProList();
  }

  viewInterviewProList() {
    this.router.navigate(['/biz-interview/' + this.projectMatch['id'] + '/interviews-per-role/' + this.roleId],
     {queryParams: {
      requestid: this.requestId,
      index: this.selectedTab
     }});
    this.selectedTab = 3;
  }

  getProjectDetail() {
    return this.matchService.getRoleMatchs(this.requestId).subscribe(result =>{
      this.projectMatch = {
        projectName: result.proRequest.project.projectName,
        id: result.proRequest.project.id,
        description: result.proRequest.project.description,
        startDate: result.proRequest.project.startDate,
        endDate: result.proRequest.project.endDate
      }
      result.roleMatches.forEach(element => {
        if(element.proRequirementId == this.roleId) {
          this.roleMatch.roleName = element.roleName;
          this.roleMatch.status = element.status
        }
      });
    }, error => {

    })
  }

  onProListChange(data){
    this.numberOfPro = data.numberProlist,
    this.numberOfProSaved = data.numberProlistSaved
  }

  onGetInterviewByRole(roleId) {
    this.subscription = this.interviewService
      .getInterviewByRole(roleId)
      .subscribe(
        (res: HttpResponse<any>) => {
          if (res.body && res.body.length > 0) {
            this.numberOfProInterview = res.body.length;
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

  onIncreaseInterview(data){
    console.log('couter: ', data);
    if(data){
      this.numberOfProInterview++;
    }
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }    
  }

}
