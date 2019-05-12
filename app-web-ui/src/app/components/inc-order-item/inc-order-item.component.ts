import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { Order } from '../../interfaces';


@Component({
  selector: 'inc-order-item',
  templateUrl: './inc-order-item.component.html',
  styleUrls: ['./inc-order-item.component.scss']
})
export class IncOrderItemComponent {

  @Input() order: Order;

  public moment(datetime: string): string {
    return moment(datetime).format('DD/MM/YYYY HH:mm:ss');
  }

}
