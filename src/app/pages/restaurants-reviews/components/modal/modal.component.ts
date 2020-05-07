// /// <reference types="@types/googlemaps" />
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.styl'],
})
export class ModalComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() isOpen: boolean;
  constructor() {}

  closeModal() {
    this.close.emit(null);
  }
}
