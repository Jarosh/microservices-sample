import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Order } from '../../interfaces';


@Component({
  selector: 'inc-order-form',
  templateUrl: './inc-order-form.component.html',
  styleUrls: ['./inc-order-form.component.scss']
})
export class IncOrderFormComponent {

  @Input() card: Order;

  @Output() submit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  public items: {[key: string]: string}[];
  public summary: string;

  public onSubmit(): void {
    this.submit.emit({
      summary: this.summary,
      items: this.items && this.items.map((i: {[key: string]: string}) => i.value) || []
    });
  }

  public onCancel(): void {
    this.cancel.emit(true);
  }

}
