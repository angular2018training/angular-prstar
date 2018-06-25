import { Router } from '@angular/router';
import { BizService } from '../../entities/biz/biz.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-biz-profile-result',
  templateUrl: './biz-profile-result.component.html',
  styles: []
})
export class BizProfileResultComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private bizService: BizService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.dismiss();
    if (!this.bizService.error) {
      this.router.navigate(['/']);
    }
  }

  goToDashboard() {
    this.activeModal.dismiss();
    this.router.navigate(['/#/dashboard']);
  }
}
