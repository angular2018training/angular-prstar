import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { BidUserService } from './bid-common.service';
import { Subscription } from 'rxjs';
import { InterviewService } from '../../biz-interview/services/interview.service';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-bid-common-individual',
  templateUrl: './bid-common-individual.component.html',
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
export class BidCommonIndividualComponent implements OnInit {
  // NEW
  roleID: number = 1;
  tab: number = 0;
  isReviewList: boolean = true;
  isSavedList: boolean = false;
  postId = this.activatedRoute.snapshot.queryParams['postId'];
  // PRO-REQUIREMENT
  proRequirement: any;

  @ViewChild('yourChild') child;
  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bidUserService: BidUserService,
    private router: Router,
    private interviewService: InterviewService,
    private jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {

      if (!params['roleID'] || !params['tab']) {
        // show error or route to another page
        return;
      }
      this.roleID = params['roleID'];
      this.tab = params['tab'];
      this.bidUserService.getProRequirementDetailSingle(this.roleID).subscribe(proRequirementDetail => {
        this.proRequirement = proRequirementDetail;
      });
      this.onGetInterviewByRole(this.roleID);
    });
  }

  ngAfterViewInit() {
  }


  viewInReviewProList() {
    this.tab = 0;
    this.child.viewInReviewProList();
  }
     
  viewSavedProList() {
    this.tab = 1;
    this.child.viewSavedProList();
  }

  viewInterviewProList() {
    this.router.navigate(['/biz-interview/' + this.proRequirement.project.id + '/interviews-per-role/' + this.proRequirement.id]);
  }

  updateProRequirementDetail() {
    this.bidUserService.getProRequirementDetailSingle(this.roleID).subscribe(proRequirementDetail => {
      this.proRequirement = proRequirementDetail;
    });
  }

  onGetInterviewByRole(roleId) {
    this.subscription = this.interviewService
      .getInterviewByRole(roleId)
      .subscribe(
        (res: HttpResponse<any>) => {
          if (res.body && res.body.length > 0) {
            this.proRequirement.numberOfInterview = res.body.length;
          }
        },
        (res: HttpErrorResponse) => {
          this.onError(res.message);
        }
      );
  }

  onIncreaseInterview(data){
    if(data){
      this.proRequirement.numberOfInterview++;
    }
  }

  private onError(error) {
    this.jhiAlertService.error(error.mesage, null, null);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }    
  }

}
