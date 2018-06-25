import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { ChangeRequestBidModalService } from './change-request-bid-modal.service';
import { ChangeRequestBid } from './change-request-bid.model';
import { ChangeRequestBidService } from './change-request-bid.service';
import { FileService } from '../../entities/file';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-change-request-bid-common',
  templateUrl: './change-request-bid.component.html',
  styles: [],
})
export class ChangeRequestBidComponent implements OnInit {
  @Input() bidId: number;
  @Input() proId: number;
  @Input() isPro: boolean;

  changeRequestList: ChangeRequestBid[] = [];
  changeRequest: ChangeRequestBid = new ChangeRequestBid();

  constructor(
    // private jhiAlertService: JhiAlertService,
    private changeRequestModalService: ChangeRequestBidModalService,
    private changeRequestBidService: ChangeRequestBidService,
    private fileService: FileService

  ) { }


  ngOnInit() {
    this.changeRequestBidService.getBidChangeRequestHistory(this.bidId).subscribe(
      response => {
        this.changeRequestList = response;
      });
  }

  openDialog() {
    this.changeRequestBidService.bidID = this.bidId;
    this.changeRequestBidService.proID = this.proId;
    const modalRef = this.changeRequestModalService.open();

    modalRef.result.then(
      (result) => { // Event when modal.close
        this.changeRequestModalService.modalClosed();
        if (result === "Success") {
          // Reload Bid Change Request history list
          this.changeRequestBidService.getBidChangeRequestHistory(this.bidId).subscribe(
          response => {
            this.changeRequestList = response;
          });
        }
      }, 
      (reason) => { // Event when modal.dismiss
        this.changeRequestModalService.modalClosed();
      }
    );

  }

  download(filePath, fileName) {
    this.fileService.getDownloadFile({
      relativeFilePath: filePath
    }).subscribe(
      results => {
        this.changeRequest.proposal = results;

        let url = window.URL.createObjectURL(this.changeRequest.proposal);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      }
    );

  }
}