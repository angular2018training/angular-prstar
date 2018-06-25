import { Component, OnInit, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-bid-submit-success',
  templateUrl: './bid-submit-success.component.html',
})
export class BidSuccessComponent implements OnInit {
  constructor(
    private activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("Init Dialog Bid Success");
  }

  closeAndGotToDashboard() {
    this.router.navigate(['dashboard']);
    this.activeModal.dismiss();
  }

  closeAndGotToPostWall() {
    this.router.navigate(['postWall']);
    this.activeModal.dismiss();
  }
}