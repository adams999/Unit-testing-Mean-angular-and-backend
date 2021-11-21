import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() clicked = new EventEmitter<boolean>();
  counter = 0;
  incrementar() {
    this.counter++;
  }
}
