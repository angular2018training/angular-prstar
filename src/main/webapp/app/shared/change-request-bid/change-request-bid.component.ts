import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {  JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-change-request-bid-common',
  templateUrl: './change-request-bid.component.html',
  styles: [],
})
export class ChangeRequestBidComponent implements OnInit {
  @Input() bidId: number;

  constructor(
    private jhiAlertService: JhiAlertService,

  ) { }


  ngOnInit() {
    
  }
  
}