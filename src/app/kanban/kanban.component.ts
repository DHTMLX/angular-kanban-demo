import { Kanban } from "@dhx/trial-kanban";
import { getData } from "./data";

import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "kanban",
  styleUrls: ["./kanban.component.css"],
  template: `<div #here class="widget"></div>`,
})
export class KanbanComponent implements OnInit, OnDestroy {
  @ViewChild("here", { static: true }) container!: ElementRef;

  private _kanban!: Kanban;

  ngOnInit() {
    const { cards, columns } = getData();
    const kanban = new Kanban(this.container.nativeElement, {
      columns,
      cards,
    });

    this._kanban = kanban;
  }

  ngOnDestroy(): void {
    this._kanban.destructor();
  }
}
