import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';

import { NgbModal, NgbModalRef, NgbModalOptions, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {File, FileService } from '../../../entities/file'
import { ContractTemplate } from './contract-template.model';
import { ContractTemplateService } from './contract-template.service';
import { ContractTemplatePopupComponent } from './contract-template-popup.component';
import { ModalDialogService } from '../../../shared/dialog/modal-dialog.service';
import { Principal, Account } from '../../../shared';
import { Router } from '@angular/router';
import { ContractService } from '../contract.service';

@Component({
    selector: 'jhi-contract-template',
    templateUrl: './contract-template.component.html',
    styles: []
})
export class ContractTemplateComponent implements OnInit {
    contractTemplates: ContractTemplate[];
    contractTemplate: ContractTemplate;
    downloadedFile: any;
    currentContract;
    validateAvatarFile = {
        isNotImage: false,
        isOverSize: false
      };
      validateResumeFile = {
        isOverSize: false
      }
    file: File;
    isSaving: boolean;
    account: Account;
    isProUser: boolean;
    isBizUser: boolean;
    
    countInprocess: number;
    countCompleted: number;
    countTemplate: number;
    constructor(
       
        private modalService: NgbModal,
        private fileService: FileService,
        private jhiAlertService: JhiAlertService,
        private contractTemplateService: ContractTemplateService,       
        private modalDialog: ModalDialogService,
        private router: Router,
        private contractService: ContractService,
        
    ){ }
    onLoadlistContractTemplate(){
        this.contractTemplateService.query().subscribe(
            (res: HttpResponse<ContractTemplate[]>) => {
                this.contractTemplates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.onLoadlistContractTemplate();   
        this.onCountStatusContract();    
    }
    onEditContractTemplate(id: number, contractName: string,contractfileId: number){
     this.openEditDialog(id,contractName,contractfileId);
    }
    onDeleteContractTemplate(id: number){
        let me = this;
        let map = new Map<string, VoidFunction>();
        map.set("prostarsWebApp.contract.delete.ButonOK", () => {
            me.contractTemplateService.delete(id).subscribe((response) => {
                if(response){
                    this.onLoadlistContractTemplate();
                    this.onCountStatusContract();
                }
            });
        });
        this.modalDialog.open(
            "prostarsWebApp.contract.delete.Waring",
            "prostarsWebApp.contract.delete.question",
            map,
            false
        );
    }
    onClickCreateContracTemplate(){
        this.openAddDialog();
        
    }
    onClickDownloadContractTemplate(filePath, fileName, contentType){
        this.fileService.getDownloadFile({
            relativeFilePath: filePath
          }).subscribe(
              results => {
                this.downloadedFile = results;
                let arrayTemp = contentType.split('/',3);
                let fileExtension = arrayTemp[1];
                let downloadFileName = fileName;
                let url = window.URL.createObjectURL(this.downloadedFile);
                let a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = downloadFileName;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
              }
          );
    }

      submitAddTemplate(){
        this.isSaving = true;
        this.contractTemplate.createdDate = new Date();
        this.subscribeToSaveResponse(
        this.contractTemplateService.create(this.contractTemplate));
        
    }
    private subscribeToSaveResponse(result: Observable<HttpResponse<ContractTemplate>>) {
        result.subscribe((res: HttpResponse<ContractTemplate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ContractTemplate) {
        // this.eventManager.broadcast({ name: 'contractTemplateListModification', content: 'OK'});
        this.isSaving = false;
    }
    private onSaveError() {
        this.isSaving = false;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    openAddDialog(): NgbModalRef {
        let ngbModalOptions: NgbModalOptions = {
            backdrop : 'static',
            keyboard : false
        };
        const modalRef = this.modalService.open(ContractTemplatePopupComponent, ngbModalOptions);
        modalRef.result.then((result) => {
            if(result)
            {
            this.onLoadlistContractTemplate();
            this.onCountStatusContract();
            }
        }, (reason) => {
        });
        return modalRef;
    }
    openEditDialog(id: number, contractName: string, contractfileId: number): NgbModalRef {
        let ngbModalOptions: NgbModalOptions = {
            backdrop : 'static',
            keyboard : false
        };
        const modalRef = this.modalService.open(ContractTemplatePopupComponent, ngbModalOptions);
        modalRef.componentInstance.contractTemplateId = id;
        modalRef.componentInstance.contractTemplateName = contractName;
        modalRef.componentInstance.contractfileId = contractfileId;
        modalRef.result.then((result) => {
            this.onLoadlistContractTemplate();
            this.onCountStatusContract();
        }, (reason) => {
        });
        return modalRef;
    }

    navigate(url : string){
        this.router.navigateByUrl(url);
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
    this.contractService.countTemplateStatus().subscribe(
        (res)=>{
          this.countTemplate = Number(res);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      )
   }
}