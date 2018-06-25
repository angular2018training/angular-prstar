import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchLandingService } from '../../match-landing.service';
import { InterviewService } from '../../../biz-interview/services/interview.service';
import { Subscription } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ProjectDTO } from '../../../biz-interview/models/project.model';
import { JhiAlertService } from 'ng-jhipster';
import { ContractService } from '../../../contract/contract.service';

@Component({
  selector: 'app-biz-landing',
  templateUrl: './biz-landing.page.html',
  styleUrls: ['./biz-landing.page.scss']
})
export class BizLandingPage implements OnInit {
  posts = [];
  proRequsets = [];
  interviews = [];
  numberContractInProgress = 10;
  numberContractCompleted = 5;
  projectExistedInterview: any;
  projectExistedInterviewSubs: Subscription;
  countInprocess: Number;
  countCompleted: Number;

  constructor(
    private router: Router,
    private matchLandingService: MatchLandingService,
    private interviewService: InterviewService,
    private jhiAlertService: JhiAlertService,
    private contractService: ContractService,
  ) {}

  ngOnInit() {
    this.getBizLandingData();
    this.getProjectExistedInterview();
    this.onCountStatusContract();
  }

  getProjectExistedInterview() {
    this.projectExistedInterviewSubs = this.interviewService
      .getExistedInterviews()
      .subscribe(
        (res: HttpResponse<ProjectDTO[]>) => {
          if (res.body) {
            this.projectExistedInterview = res.body;
          }
        },
        (res: HttpErrorResponse) => {
          this.onError(res.message);
        }
      );
  }

  getBizLandingData() {
    return this.matchLandingService.getBizLandingData().subscribe(result => {
      this.posts = result;
      // this.proRequsets = result.proRequsets;
      // this.interviews = result.interviews;
      this.getMatchReports();
    }, eroor =>{
      
    })
  }

  getMatchReports() {
    return this.matchLandingService.getMatchReports().subscribe(result =>{
      this.proRequsets = result;
    }, error => {

    })
  }

  onSelectedPost(post) {
    this.router.navigate(['bid-wall'], { queryParams: { postId: post.id } });
  }

  private onError(error) {
    this.jhiAlertService.error(error.mesage, null, null);
  }

  onSelectedRequest(request) {
    this.router.navigate(['match-common-project'], { queryParams: {requestid: request.id} });
  }
  onContract(){
    this.router.navigate(['/contract-template'])
  }
  onInprocessContractBiz(){
    this.router.navigate(['/contract-pending'])
  }
  onCompletedContractBiz(){
    this.router.navigate(['/contract-completed'])
  }
  onCountStatusContract(){
    this.contractService.countInprocessStatus().subscribe(
      (res)=>{
        this.countInprocess = Number(res);
       
      },
      (res: HttpErrorResponse) => this.onError(res.message)

    )
    this.contractService.countCompletedStatus().subscribe(
      (res)=>{
        this.countCompleted = Number(res);
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    )
  }
}
