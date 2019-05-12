import { Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Order } from '../../interfaces';
import { OrderResource } from '../../resources/order.resource';


@Component({
  selector: 'app-order-list',
  templateUrl: './app-order-list.component.html',
  styleUrls: ['./app-order-list.component.scss']
})
export class AppOrderListComponent {

  public orders$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  public isOrderFormVisible = false;

  constructor(
    private orderResource: OrderResource
  ) {
    this.orderResource.getAllOrders().subscribe(
      (res: Order[]) => {
        this.orders$.next(res);
      }
    );
  }

  public onShowNewOrderForm(): void {
    this.isOrderFormVisible = true;
  }

  public onHideNewOrderForm(): void {
    this.isOrderFormVisible = false;
  }

  public onCreateOrder(data: Order): void {
    this.orderResource.createOrder(data).subscribe(
      (res: Order) => {
        this.pushNewlyCreatedOrder(res);
        this.onHideNewOrderForm();
      },
      () => {
        alert('Creation failed due to an unexpected error.');
      },
    );
  }

  private pushNewlyCreatedOrder(order: Order) {
    this.orders$.asObservable().pipe(take(1)).subscribe((orders: Order[]) => {
      this.orders$.next([...orders, order]);
    });
  }

}
