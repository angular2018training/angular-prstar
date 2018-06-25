import { BizService } from '../../entities/biz/biz.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessengerService } from '../shared/messenger.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'jhi-biz-profile',
  templateUrl: './biz-profile.component.html',
  styles: []
})
export class BizProfileComponent implements OnInit {
  active = 'active';
  messageSubscription: Subscription;

  constructor(
    private bizService: BizService,
    private cdr: ChangeDetectorRef,
    private messengerService: MessengerService
  ) { }

  ngOnInit() {
    this.messageSubscription = this.messengerService.message.subscribe(val => {
      this.bizService.currentStep = val;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.bizService.currentStep = 1;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  activeStep1() {
    if (this.bizService.currentStep === 1) {
      return 'active';
    }
    return '';
  }

  activeStep2() {
    if (this.bizService.currentStep === 2) {
      return 'active';
    }
    return '';
  }

  activeStep3() {
    if (this.bizService.currentStep === 3) {
      return 'active';
    }
    return '';
  }
}