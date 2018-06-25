import { BidUpdateComponent } from './../update-bid/bid-update.component';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bid } from './../../../entities/bid/bid.model';
import { HttpResponse } from '@angular/common/http';
import { BidService } from './../bid.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FileService } from '../../../entities/file';

@Component({
    selector: 'jhi-bid-detail',
    templateUrl: './bid-detail.component.html'
})
export class BidDetailComponent implements OnInit {

    bidId: number;
    bid: Bid;

    constructor(
        private bidService: BidService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private fileService: FileService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.bidId = params['id'];
            this.onLoad();
        });
    }

    onLoad() {
        this.bidService.find(this.bidId).subscribe((res: HttpResponse<Bid>) => {
            this.bid = res.body;
            console.log(this.bid);
        });
    }

    onClickUpdateBid() {
        this.openEditDialog(this.bid)
    }

    openEditDialog(bid: Bid): NgbModalRef {
        let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
        };

        const modalRef = this.modalService.open(BidUpdateComponent, ngbModalOptions);
        modalRef.componentInstance.oldBid = bid;
        modalRef.result.then((result) => {
            this.onLoad();
        }, (reason) => {
        });
        return modalRef;
    }

    downloadFile(filePath, fileName) {
        this.fileService.getDownloadFile({
            relativeFilePath: filePath
        }).subscribe(results => {
                let url = window.URL.createObjectURL(results);
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