import { MessengerService } from './../../shared/messenger.service';
import { Subscription } from 'rxjs/Subscription';
import { ProService } from './../../../entities/pro/pro.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'jhi-pro-detail-profile',
  templateUrl: './pro-detail-profile.component.html',
  styles: []
})
export class ProDetailProfileComponent implements OnInit {
  active = 'active';
  private messageSubscription: Subscription;
  
  constructor(
    private proService: ProService,
    private cdr: ChangeDetectorRef,
    private messengerService: MessengerService
  ) { }

  ngOnInit() {
    this.messageSubscription = this.messengerService.message.subscribe(val => {
      this.proService.currentStep = val;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.proService.currentStep = 1;
    this.cdr.detectChanges();
  }

  activeStep1() {
    if (this.proService.currentStep === 1) {
      return 'active';
    }
    return '';
  }

  activeStep2() {
    if (this.proService.currentStep === 2) {
      return 'active';
    }
    return '';
  }

  activeStep3() {
    if (this.proService.currentStep === 3) {
      return 'active';
    }
    return '';
  }
}
