
import { Contract } from '../contract.model';
import { Component, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { ContractService } from '../contract.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractHistory } from './contract-history.model'
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContractEditPopupComponent } from './contract-edit-popup.component';
import { FileService } from '../../../entities/file';


@Component({
    selector: 'jhi-contract-detail',
    templateUrl: './contract-detail.component.html',
    styles: []
})
export class ContractDetailComponent implements OnInit {
    contractList: Contract;
    isSaving: boolean;

    subscription: Subscription;

    historyList: ContractHistory[];
    history: History;
    contractAccept: Contract;
    contractReject: Contract;
    idContract: number;
    downloadedFile: any;


    constructor(
        private modalService: NgbModal,
        private contracService: ContractService,
        private route: ActivatedRoute,
        private router: Router,
        private fileService: FileService,
        private jhiAlertService: JhiAlertService
    ) { }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.idContract = params["id"];
            this.onGetDataById(this.idContract);
            console.log('id: ', this.idContract);
            this.contracService.setIdContract(params["id"]);
        });

    }
    onGetDataById(idContract) {
        this.contracService.queryById(idContract).subscribe(
            (res: HttpResponse<Contract>) => {
                this.contractList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onClickReject(id: number) {
        this.contracService.updateRejectStatus(this.contractList).subscribe(res => {
            this.router.navigate(['contract-completed', id]);
        });

    }

    onClickAccept(id: number) {
        this.contracService.updateAcceptStatus(this.contractList).subscribe(res => {
            this.router.navigate(['contract-completed', id]);
        });
        
    }

    openChangeRequestDialog(Id: number, contractName: string): NgbModalRef {
        let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
        };
        const modalRef = this.modalService.open(ContractEditPopupComponent, ngbModalOptions);
        modalRef.componentInstance.contractId = Id;
        modalRef.componentInstance.contractName = contractName;
        modalRef.result.then((result) => {
            this.onGetDataById(Id);
        }, (reason) => {
        });
        return modalRef;
    }
    onClickDownloadContractTemplate(filePath, fileName, contentType) {
        this.fileService.getDownloadFile({
            relativeFilePath: filePath
        }).subscribe(
            results => {
                this.downloadedFile = results;
                let arrayTemp = contentType.split('/', 3);
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

}