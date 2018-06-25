import { BidService } from './../bid.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiDataUtils } from 'ng-jhipster';
import { DatePipe } from '@angular/common';
import { Bid, File, Owner, Account, ProRequirement } from './../bid.model';
import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
declare var window;

@Component({
    selector: 'jhi-bid-update',
    templateUrl: 'bid-update.component.html'
})
export class BidUpdateComponent implements OnInit {

    @Input() oldBid: Bid;
    bid: Bid;
    pickStartDate: string;
    pickEndDate: string;
    proposalIsOverSize: boolean = false;
    maxSizeProposal: number = 3145728;

    constructor(
        private bidService: BidService,
        private datePipe: DatePipe,
        private activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils
    ) { }

    ngOnInit() {
        this.pickStartDate = this.datePipe.transform(this.oldBid.startDate, "yyyy-MM-dd");
        this.pickEndDate = this.datePipe.transform(this.oldBid.endDate, "yyyy-MM-dd");

        this.bid = new Bid();
        this.bid.id = this.oldBid.id;
        this.bid.note = this.oldBid.note;
        this.bid.proposedPrice = this.oldBid.proposedPrice;
        this.bid.proposalText = this.oldBid.proposalText;
        this.bid.startDate = this.oldBid.startDate;
        this.bid.endDate = this.oldBid.endDate;
        this.bid.proRequirement = this.oldBid.proRequirement;
        this.bid.owner = this.oldBid.owner;
    }

    close() {
        this.activeModal.dismiss();
    }

    save() {
        console.log(this.bid);
        this.subscribeToSaveResponse(this.bidService.update(this.bid));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bid>>) {
        result.subscribe((res: HttpResponse<Bid>) =>
            this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError(res));
    }

    private onSaveSuccess() {

        this.activeModal.close();
    }

    private onSaveError(result: any) {

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

    setMultipleFileData(event) {
        if (event && event.target.files) {
            let files = event.target.files;

            this.bid.portfolios = [];

            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                this.dataUtils.toBase64(file, (base64Data) => {
                    let f = new File();
                    f.content = base64Data;
                    f.contentType = file.type;
                    f.name = file.name;
                    this.bid.portfolios.push(f);
                });
            }
        }
    }

    ngAfterViewInit(){
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
        ],(data) => {
            this.bid.startDate = new Date(data);
        }, new Date(this.bid.startDate), new Date(), null);

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
        ],(data) => {
            this.bid.endDate = new Date(data);
        }, new Date(this.bid.endDate), new Date(), null);
    }

}