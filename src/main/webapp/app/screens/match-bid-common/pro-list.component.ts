import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: '[jhi-pro-list]',
  templateUrl: './pro-list.component.html',
  styles: [
    `.active {
        background-color: #d2eafd;
    }`
  ]
})
export class ProListComponent implements OnInit {

  @Input() currentProList;
  @Input() roleName;
  @Output() selectedProChange = new EventEmitter();
  @Input() currentProIndex;;

  selectedProIndex = this.currentProIndex;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.currentProIndex) {
      this.selectedProIndex = this.currentProIndex;
    }
  }

  ngOnInit() {
  }

  onSelectedPro(index) {
    this.selectedProChange.emit(index);
    this.selectedProIndex = index;
  }

}
