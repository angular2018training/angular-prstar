import { Component, OnInit,Input, ElementRef, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {File } from '../../../entities/file';
import { ContractTemplate } from '../contract-template/contract-template.model';
import { Contract } from '../contract.model';
import { ContractService } from '../contract.service';
import { JhiDataUtils } from 'ng-jhipster';
import { FILE_SIZE } from '../../../app.constants';

@Component({
    selector: 'jhi-contract-edit-popup',
    templateUrl: './contract-edit-popup.component.html',
    styles: []
})

export class ContractEditPopupComponent implements OnInit {
  @Input() contractId: number;
  @Input() contractName: string;
  @Input() fileContractId: number;
  
  isSaving: boolean;
  contractData: Contract;
    validateAvatarFile = {
        isNotImage: false,
        isOverSize: false
      };
      validateResumeFile = {
        isOverSize: false
      }
  uploadedFile: any;
    constructor(
        private activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private contractService: ContractService,
    ) { 
        this.contractData = new Contract;
        this.contractData.file = new File;
    }
  
    ngOnInit() {
      //this.backgroundData = this.contractService.contactDataFile;
      }
      cancel(){
        this.activeModal.dismiss();
      }
    private subscribeToSaveResponse(result: Observable<HttpResponse<ContractTemplate>>) {
        result.subscribe((res: HttpResponse<ContractTemplate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ContractTemplate) {
        // this.eventManager.broadcast({ name: 'contractTemplateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.close(result);
    }
    private onSaveError() {
        this.isSaving = false;
    }
    setChangeRequest(event){
      if (event && event.target.files && event.target.files[0]) {
        this.validateResumeFile.isOverSize = false;
        const file = event.target.files[0];
        if (file.size > FILE_SIZE) {
          this.validateResumeFile.isOverSize = true;
          this.contractData.file.name = "";
          return;
        }
        this.dataUtils.toBase64(file, (base64Data) => {
          this.contractData.file.content = base64Data;
            this.contractData.file.contentType = file.type;
            this.contractData.file.name = file.name;
        });
    }
  }
  submitEditContract(){
    this.isSaving = true;
    this.contractData.id = this.contractId;
    this.contractData.name = this.contractName;
    //this.contractData.file.id = this.fileContractId;
    this.subscribeToSaveResponse(
    this.contractService.update(this.contractData));
  }
}