import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
declare var bootstrap: any

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html'
})
export class ModalComponent implements AfterViewInit {

  modal: any
  @Output() submitClicked = new EventEmitter()

  ngAfterViewInit(): void {
    this.modal = new bootstrap.Modal(document.getElementById('infoModal'), {
      keyboard: false,
      backdrop: 'static'
    })
  }

  onSubmitClicked() {
    this.submitClicked.emit()
  }

  close() {
    this.modal.hide()
  }
}
