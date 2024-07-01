import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css'],
})
export class MenuSidebarComponent {
  @Output() componentSelected = new EventEmitter<string>();

  showComponent(component: string) {
     console.log('Component selected:', component);
    this.componentSelected.emit(component);
  }
}
