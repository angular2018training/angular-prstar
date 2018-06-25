import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-interview-summary',
  templateUrl: './interview-summary.component.html',
  styleUrls: ['./interview-summary.component.scss']
})
export class InterviewSummaryComponent implements OnInit {

  @Input('currentInterview') interview: any;
  @Input('currentSession') session: any;
  @Output('approve') approve = new EventEmitter<boolean>();
  @Output('previous') previous = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  onAccept(){
    this.approve.emit(true);
  }

  onPass(){
    this.approve.emit(false);
  }

  onPrevious(){
    this.previous.emit(this.session);
  }

}
