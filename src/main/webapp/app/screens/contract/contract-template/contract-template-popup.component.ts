import { Component, OnInit,Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {File } from '../../../entities/file';
import { ContractTemplate } from './contract-template.model';
import { ContractTemplateService } from './contract-template.service';
import { Contract } from '../contract.model';
import { ContractService } from '../contract.service';
import { FILE_SIZE } from '../../../app.constants';
declare var window: any;

@Component({
    selector: 'jhi-contract-template-popup',
    templateUrl: './contract-template-popup.component.html',
    styles: []
})
export class ContractTemplatePopupComponent implements OnInit {
  //;
  @Input() contractTemplateId: number;
  @Input() contractTemplateName: string;
  @Input() contractfileId: number;
  @Input() contractId: number;
  @Input() contractName: string;
  
  
  isSaving: boolean;
  contractTemplate: ContractTemplate;
  contractData: Contract;  
  backgroundData;
    content = '';
    validateAvatarFile = {
        isNotImage: false,
        isOverSize: false
      };
      validateResumeFile = {
        isOverSize: false
      }
  errorList = [];
    constructor(
        private activeModal: NgbActiveModal,
        private route: ActivatedRoute,
        private router: Router,
        private dataUtils: JhiDataUtils,
        private contractTemplateService: ContractTemplateService,
        private contractService: ContractService,
    ) { 
      this.contractTemplate = new ContractTemplate;
      this.contractTemplate.file = new File;
    }

    ngOnInit() {
      //this.backgroundData = this.contractService.contactDataFile;
      }
      setFileData(event) {
        if (event && event.target.files && event.target.files[0]) {
          this.validateResumeFile.isOverSize = false;
          const file = event.target.files[0];
          if (file.size > FILE_SIZE) {
            this.validateResumeFile.isOverSize = true;
            this.contractTemplate.file.name = "";
            return;
          }
          this.dataUtils.toBase64(file, (base64Data) => {
              this.contractTemplate.file.content = base64Data;
              this.contractTemplate.file.contentType = file.type;
              this.contractTemplate.file.name = file.name;
          });
        }
      }
      cancel(){
        this.activeModal.dismiss();
      }
      submitAddTemplate(){
        this.validData();
        this.isSaving = true;
        this.contractTemplate.createdDate = new Date();
        this.subscribeToSaveResponse(
        this.contractTemplateService.create(this.contractTemplate));
        
    }
    setEditFileData(event) {
      if (event && event.target.files && event.target.files[0]) {
        this.validateResumeFile.isOverSize = false;
        const file = event.target.files[0];
        if (file.size > FILE_SIZE) {
          this.validateResumeFile.isOverSize = true;
          this.contractTemplate.file.name = "";
          return;
        }
        this.dataUtils.toBase64(file, (base64Data) => {
          
            this.contractTemplate.file.content = base64Data;
            this.contractTemplate.file.contentType = file.type;
            this.contractTemplate.file.name = file.name;
        });
      }
    }
    validData() : boolean {
      this.errorList = [];
      if (this.contractTemplate.name === undefined) {
        this.errorList.push("Requied Name");
      }
      return this.errorList.length === 0;
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
    submitEditTemplate(){
      this.isSaving = true;
      this.contractTemplate.id = this.contractTemplateId;
      this.contractTemplate.createdDate = new Date();
      this.contractTemplate.name  = this.contractTemplateName;
      this.contractTemplate.file.id = this.contractfileId;
      this.subscribeToSaveResponse(
      this.contractTemplateService.update(this.contractTemplate));
    }
   
}