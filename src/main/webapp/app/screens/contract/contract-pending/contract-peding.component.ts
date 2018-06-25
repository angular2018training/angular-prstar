import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';
import { Contract } from '../contract.model';
import { ContractPopupComponent } from './contract-popup.component';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Principal,Account } from '../../../shared';
declare var $;


@Component({
    selector: 'jhi-contract-pending',
    templateUrl: './contract-pending.component.html',
    styles: []
})
export class ContractPendingComponent implements OnInit {
    contracts: Contract[];
    account: Account;
    isProUser: boolean;
    isBizUser: boolean;
    countInprocess: number;
    countCompleted: number;
    countTemplate: number;
    constructor(
        private jhiAlertService: JhiAlertService,
        private contractService: ContractService,
        private modalService: NgbModal,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
    ) { }
    ngOnInit() {
        this.onLoadListContract();
        this.principal.identity().then((account) => {
            this.account = account;
            // Check is Pro User
            this.isProUser = this.account.authorities.find((role) => {
                return role === 'ROLE_PRO';
            }) != null;
            // Check biz user
            this.isBizUser = this.account.authorities.find((role) => {
                return role === 'ROLE_BIZ';
            }) != null;
        });
        this.onCountStatusContract();
    }
    ngAfterViewInit() {
        this.onLoadListContract();
    }
    onLoadListContract(){
        this.contractService.queryListPending().subscribe(
            (res: HttpResponse<Contract[]>) => {
                this.contracts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    onClickCreateContract(){
        this.openSuccessDialog();
    }
    
    // onClickDetail(id : number){
    //     let ngbModalOptions: NgbModalOptions = {
    //         backdrop : 'static',
    //         keyboard : false
    //     };
    //     const modalRef = this.modalService.open(ContractDetailComponent, ngbModalOptions);
    //     modalRef.componentInstance.contractId = id;
    //     modalRef.result.then((result) => {
           
    //     }, (reason) => {
    //     });
    //     return modalRef;
    // }

    onClickDetail(id : number){
        this.router.navigate(['contract-pending', id]);

    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    openSuccessDialog(): NgbModalRef {
        let ngbModalOptions: NgbModalOptions = {
            backdrop : 'static',
            keyboard : false
        };
        const modalRef = this.modalService.open(ContractPopupComponent, ngbModalOptions);
        modalRef.result.then((result) => {
            this.onLoadListContract();
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