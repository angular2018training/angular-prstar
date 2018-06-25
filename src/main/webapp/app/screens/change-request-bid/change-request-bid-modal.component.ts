import { ProService } from './../../entities/pro/pro.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeRequestBidModalService } from './change-request-bid-modal.service';
import { ModalDialogService } from '../../shared/dialog/modal-dialog.service';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ChangeRequestBid } from './change-request-bid.model';
import { ChangeRequestBidService } from './change-request-bid.service';
import { Observable } from 'rxjs/Observable';
import { Bid, File, Owner, Account } from '../../screens/bid/bid.model';

@Component({
  templateUrl: './change-request-bid-modal.component.html',
  styles: []
})
export class ChangeRequestBidModalComponent implements OnInit {
  @Input() bidID: number;
  @Input() currentLoginID: number;
  newChangeRequestBid: ChangeRequestBid = new ChangeRequestBid();

  proposal: File;
  comment: string;
  invalid: boolean = false;

  filesIsOverSize: boolean = false;
  proposalIsOverSize: boolean = false;
  maxSizeProposal: number = 3145728;

  constructor(
    private activeModal: NgbActiveModal,
    private changeRequestBidService: ChangeRequestBidService,
    private dataUtils: JhiDataUtils,
    private jhiAlertService: JhiAlertService
  ) { }

  ngOnInit() {
  }

  submit() {
   
  }

  close(){
    this.activeModal.dismiss("Cancel");
  }

  cancel(){
    // reset data?
    this.activeModal.dismiss("Cancel");
  }

  save(){
    this.invalid = false;

    if (this.newChangeRequestBid.proposal == undefined && this.comment == undefined) {
      this.invalid = true;
      return;
    }

    if (this.comment){
      this.newChangeRequestBid.comment = this.comment;
    }
    this.newChangeRequestBid.createdDate = new Date();


    //TODO FIXME
    let bid = new Bid();
    bid.id = this.changeRequestBidService.bidID;
    this.newChangeRequestBid.bid = bid;
    this.newChangeRequestBid.bid.owner = new Owner();
    this.newChangeRequestBid.bid.owner.account = new Account();
    this.newChangeRequestBid.bid.owner.account.id = this.changeRequestBidService.proID;
    console.log(this.newChangeRequestBid);
    this.subscribeToSaveResponse(this.changeRequestBidService.create(this.newChangeRequestBid));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ChangeRequestBid>>) {
    result.subscribe((res: HttpResponse<ChangeRequestBid>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError(res));
  }

  setFileData(event) {
    if (event && event.target.files) {
        var files = event.target.files;
        var file = files[0];
        this.proposalIsOverSize = false;
        if (file.size > this.maxSizeProposal) {
            this.proposalIsOverSize = true;
            return false;
        }

        this.dataUtils.toBase64(file, (base64Data) => {
            this.newChangeRequestBid.proposal = new File();
            this.newChangeRequestBid.proposal.content = base64Data;
            this.newChangeRequestBid.proposal.contentType = file.type;
            this.newChangeRequestBid.proposal.name = file.name;
        });
    }
    
}

  private onSaveSuccess(result: ChangeRequestBid){
    this.activeModal.close("Success");
    // this.activeModal.dismiss("Success");
  }

  private onSaveError(result: any){
    this.jhiAlertService.error("Something happened!", null, null);
  }
}
