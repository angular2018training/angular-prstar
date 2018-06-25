import { ProjectDTO } from './../../../biz-interview/models/project.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchLandingService } from '../../match-landing.service';
import { InterviewService } from '../../../biz-interview/services/interview.service';
import { ContractService } from '../../../contract/contract.service';
import { ProjectCssUtil } from '../../../../shared/utils/project-css-class';

@Component({
  selector: 'app-pro-landing',
  templateUrl: './pro-landing.page.html',
  styleUrls: ['./pro-landing.page.scss']
})
export class ProLandingPage implements OnInit {

  bids = [];
  proRequests = [];
  interviews = [];
  numberContractInProgress = 10;
  numberContractCompleted = 5;
  countInprocess: number;
  countCompleted: number;
  constructor(
    private router: Router,
    private matchLandingService: MatchLandingService,
    private interviewService: InterviewService,
    private contractService: ContractService,
  ) { }

  ngOnInit() {
    this.getProLandingData();
    this.getProjectExistedInterview();
    this.onCountStatusContract();
  }

  getProLandingData() {
    return this.matchLandingService.getProLandingData().subscribe(result => {
      this.bids = result;
    }, error => {

    })
  }

  getProjectExistedInterview() {
    this.interviewService.getExistedInterviews().subscribe(
        (res: HttpResponse<ProjectDTO[]>) => {
          if (res.body) {
            this.interviews = [];
            this.proRequests = [];
            let projectList = [];
            res.body.forEach(item => {
              item.lstProRequirements.forEach(proReq => {
                projectList.push({
                    id : item.id,
                    projectName : item.projectName,
                    description : item.description,
                    startDate : item.startDate,
                    endDate : item.endDate,
                    role : {
                        id : proReq.id,
                        roleName : proReq.roleName,
                        numOfInterview : proReq.numOfInterview,
                        isClosed : proReq.isClosed,
                        interviewStatus: proReq.interviewStatus
                      },
                    isClosed : item.isClosed,
                    isPost : item.isPost
                });
              });
            });
            projectList.forEach(item => {
              if (item.role.numOfInterview != 0) {
                if (item.isPost == false && (item.role.interviewStatus === 'PENDING_AVAILABILITY'
                    || item.role.interviewStatus === 'DECLINE_INTERVIEW')) {
                  this.proRequests.push(item);
                } else {
                  this.interviews.push(item);
                }
              }
            });
            this.interviewService.interviewList = this.interviews;
            this.interviewService.proRequestInterviewList = this.proRequests;
          }
        },
        (res: HttpErrorResponse) => {
          this.onError(res.message);
        }
      );
  }

  onError(msg) {

  }

  onSelectedBid(bid) {
    this.router.navigate(['bid/'+ bid.bidId]);
  }
  onInprocessContractPro(){
    this.router.navigate(['/contract-pending'])
  }
  onCompletedContractPro(){
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

  setStatusClasses(status) {
    return ProjectCssUtil.setStatusClasses(status);
  }
}
