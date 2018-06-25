import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Bid, File, Owner, Account, ProRequirement } from './bid.model';
import { BidService } from './bid.service';
import { Pro, ProService } from '../../entities/pro';
import { ProRequirementService } from '../../entities/pro-requirement';
import { FileService } from '../../entities/file';

declare var window: any;

@Component({
    selector: 'jhi-bid-new',
    templateUrl: './bid-new.component.html'
})
export class BidNewComponent implements OnInit, AfterViewInit {
    files = [];
    bid: Bid = new Bid();
    isSaving: boolean;
    sub: any;
    pro: Owner;
    proRequirement: ProRequirement;
    startDate: any;
    endDate: any;
    proRes: Pro;
    proRequirementRes: any;
    proReqID: number;
    longtitude: number;
    latitude: number;

    filesIsOverSize: boolean = false;
    proposalIsOverSize: boolean = false;

    ownerRating: number = 4.5;

    maxSizePortfolio: number = 7340032;
    maxSizeProposal: number = 3145728;
    currentDate: any;
    pickStartDate: string;
    pickEndDate: string;
    
    constructor(
        private datePipe: DatePipe,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private bidService: BidService,
        private proService: ProService,
        private proRequirementService: ProRequirementService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            // Defaults to 0 if no query param provided.
            this.proReqID = +params['proReqID'] || 0;

            this.proRequirementService.find(this.proReqID ).subscribe(
                (res: HttpResponse<ProRequirement>) => {
                    console.log(res.body);
                    this.proRequirementRes = res.body;
                    this.proRequirementRes.bidDeadline = this.datePipe.transform(Date.parse(this.proRequirementRes.bidDeadline), "MM.dd.yyyy");
                    this.startDate = this.datePipe.transform(Date.parse(this.proRequirementRes.startDate), "MM.dd.yyyy");
                    this.endDate = this.datePipe.transform(Date.parse(this.proRequirementRes.endDate), "MM.dd.yyyy");
                    this.proRequirement = new ProRequirement(this.proRequirementRes.id);
                }
            );
        });
        this.proService.getCurrentLoginPro().subscribe(
            (res: HttpResponse<Pro>) => {
                console.log(res.body);
                this.proRes = res.body;
                this.ownerRating = this.proRes.rating;
                let proAccount = new Account(this.proRes.account.id) ;
                this.pro = new Owner(this.proRes.id, proAccount);
            }
        );

        this.latitude = 43.73154789999999;
        this.longtitude = -79.7449296972229;
        this.currentDate = this.datePipe.transform(Date.now(), "yyyy-MM-dd");
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    save() {
        // Save bid first
        this.bid.proRequirement = this.proRequirement;
        this.bid.owner = this.pro;
        this.bid.portfolios = this.files;
        this.isSaving = true;
        console.log(this.bid);
        this.subscribeToSaveResponse( this.bidService.create(this.bid) );
        
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bid>>) {
        result.subscribe((res: HttpResponse<Bid>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Bid) {
        this.bidService.openSuccessDialog();
        this.isSaving = false;
    }

    private onSaveError(result: any) {
        this.isSaving = false;
    }

    setMultipleFileData(event) {
        if (event && event.target.files) {
            let files = event.target.files;

            this.files = [];
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                this.dataUtils.toBase64(file, (base64Data) => {
                    let f = new File();
                    f.content = base64Data;
                    f.contentType = file.type;
                    f.name = file.name;
                    this.files.push(f);
                });
            }
        }
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
                this.bid.proposalFile = new File();
                this.bid.proposalFile.content = base64Data;
                this.bid.proposalFile.contentType = file.type;
                this.bid.proposalFile.name = file.name;
            });
        }
        
    }

    ngAfterViewInit() {

        window.initDatePicker("#startDate", [
            {   
                'selector' : '#endDate',
                'select' : {
                    'constraint' : 'min',
                },
                'clear' : {
                    'constraint' : 'min',
                    'value' : new Date()
                }
            }
        ],(data: Date) => {
            console.log("Start Date");
            console.log(data);
            this.bid.startDate = new Date(data);
            return;
        }, null, new Date(), null);

        window.initDatePicker("#endDate", [
            {   
                'selector' : '#startDate',
                'select' : {
                    'constraint' : 'max',
                },
                'clear' : {
                    'constraint' : 'max',
                    'value' : false
                }
            }
        ],(data: Date) => {
            console.log("End Date");
            console.log(data);
            this.bid.endDate = new Date(data);
            return;
        }, null, new Date(), null);
    }
}