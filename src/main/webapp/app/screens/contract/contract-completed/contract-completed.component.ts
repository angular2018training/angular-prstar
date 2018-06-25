import { Component, OnInit, Input } from "@angular/core";
import { Contract } from "../contract.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { JhiAlertService } from "ng-jhipster";
import { ContractService } from "../contract.service";
import { Router } from "@angular/router";
import { Principal, Account } from '../../../shared';


@Component({
  selector: 'jhi-contract-completed',
  templateUrl: './contract-completed.component.html',
  styles: []
})
export class ContractCompletedComponent implements OnInit {
  @Input() contractId: number;
  contracts: Contract[];
  contract: Contract;

  account: Account;
  isBizUser: boolean;
  countInprocess: number;
  countCompleted: number;
  countTemplate: number;
  isProUser: boolean;
  constructor(
    private jhiAlertService: JhiAlertService,
    private contractService: ContractService,
    private router: Router,
    private principal: Principal,
  ) {

  }

  ngOnInit() {
    this.principal.identity().then((account) => {
      this.account = account;
      // Check biz user
      this.isBizUser = this.account.authorities.find((role) => {
        return role === 'ROLE_BIZ';
      }) != null;
      this.isProUser = this.account.authorities.find((role) => {
        return role === 'ROLE_PRO';
      }) != null;
    });
    this.onLoadListAccept();
    this.onCountStatusContract();
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {

  }

  navigate(url : string){
    this.router.navigateByUrl(url);
}
  onLoadListAccept() {
    this.contractService.queryListAccepter().subscribe(
      (res: HttpResponse<Contract[]>) => {
        this.contracts = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }
  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }
  onCountStatusContract() {
    this.contractService.countInprocessStatus().subscribe(
      (res) => {
        this.countInprocess = Number(res);
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    )
    this.contractService.countCompletedStatus().subscribe(
      (res) => {
        this.countCompleted = Number(res);
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    )
    this.contractService.countTemplateStatus().subscribe(
      (res) => {
        this.countTemplate = Number(res);
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    )
  }
}