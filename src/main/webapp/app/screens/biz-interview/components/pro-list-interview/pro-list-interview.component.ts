import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pro-list-interview',
  templateUrl: './pro-list-interview.component.html',
  styleUrls: ['./pro-list-interview.component.scss']
})
export class ProListInterviewComponent implements OnInit {
  @Input('listInterview') public listInterview: any[] = [];
  @Input('currentInterview') public currentInterview: any;
  @Output('currentInterview') public outputInterview = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onSetCurrentInterview(currentInterviewSelected){
    this.outputInterview.emit(currentInterviewSelected);
  }

}
