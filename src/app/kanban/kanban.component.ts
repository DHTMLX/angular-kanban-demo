import { Kanban, Toolbar } from "@dhx/trial-kanban";
import { getData } from "./data";

import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "kanban",
  styleUrls: ["./kanban.component.css"],
  template:  `<div class="component_container">
                <div #toolbar_container></div>
                <div #kanban_container style="height: calc(100% - 56px);"></div>
              </div>`
})

export class KanbanComponent implements OnInit, OnDestroy {
  @ViewChild("toolbar_container", { static: true }) toolbar_container!: ElementRef;
  @ViewChild("kanban_container", { static: true }) kanban_container!: ElementRef;

  private _kanban!: Kanban;
  private _toolbar!: Toolbar;

  ngOnInit() {
    const { cards, columns } = getData();
    this._kanban = new Kanban(this.kanban_container.nativeElement, {
      columns,
      cards,
      // other configuration properties
    });

    this._toolbar = new Toolbar(this.toolbar_container.nativeElement, {
      api: this._kanban.api,
      // other configuration properties 
    });
  }

  ngOnDestroy(): void {
    this._kanban.destructor();
    this._toolbar.destructor();
  }
}
