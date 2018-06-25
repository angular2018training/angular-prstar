import { Component, OnInit, Input } from "@angular/core";
import { Contract } from "../contract.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { JhiAlertService } from "ng-jhipster";
import { ContractService } from "../contract.service";
import { Router } from "@angular/router";
import { Principal, Account } from '../../../shared';


@Component({
  selector: 'jhi-contract-status',
  templateUrl: './contract-status.component.html',
  styles: []
})
export class ContractStatusComponent implements OnInit {
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
    this.onLoadContract();
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {

  }

  onClickDetail(id: number) {
    this.router.navigate(['contract-pending', id]);
  }
  onLoadContract() {
    this.contractService.getIdContract().subscribe(data => {
      this.contractService.queryById(data).subscribe(
        (res: HttpResponse<Contract>) => {
          this.contract = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    });
  }
  
  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }
 
}