import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-dialog',
  templateUrl: './modal-dialog.component.html',
  styles: []
})
export class ModalDialogComponent implements OnInit {

  @Input() titleMsgKey: string
  @Input() contentMsgKey: string;
  @Input() okButton: Map<string, VoidFunction>;
  @Input() isCheckIcon: boolean;

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.dismiss();
  }

  execute(key) {
    this.activeModal.dismiss();
    if (this.okButton.has(key) && this.okButton.get(key)) {
      this.okButton.get(key)();
    }
  }

  getKeys(map){
    return Array.from(this.okButton.keys());
  }
}
