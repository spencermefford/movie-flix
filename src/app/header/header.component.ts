import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() hamburgerClicked = new EventEmitter<void>();

  // addNewItem(value: string) {
  //   this.newItemEvent.emit(value);
  // }
}
