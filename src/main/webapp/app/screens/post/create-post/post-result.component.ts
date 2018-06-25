import { MatchReport } from './../../../entities/match-report/match-report.model';
import { MatchingService } from './../../matching/matching.service';
import { CreatePostService } from './create-post.service';
import { ProService } from './../../../entities/pro/pro.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: 'jhi-post-result',
  templateUrl: './post-result.component.html',
  styles: [],
})
export class PostResultComponent implements OnInit {
  @Input() isCreatePost: boolean;
  @Input() proRequestId: number;
  constructor(
    private activeModal: NgbActiveModal,
    private createPostService: CreatePostService,
    private router: Router,
    private matchingService: MatchingService
  ) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.dismiss();
    if (!this.createPostService.error) {
      this.router.navigate(['/dashboard']);
    }
  }

  goToDashboard() {
    this.activeModal.dismiss();
    this.router.navigate(['/dashboard']);
  }

  goToCreateNew() {
    this.activeModal.dismiss();
    this.router.navigate(['/create-pro-request']);
  }

  goToMatchReport() {
    this.activeModal.dismiss();
    // Get match report data
    this.router.navigate(['/match-common-project'], { queryParams: { requestid: this.proRequestId } });
  }

}
