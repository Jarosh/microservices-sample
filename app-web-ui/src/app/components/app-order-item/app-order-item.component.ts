import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { concatMap, delay, expand } from 'rxjs/operators';
import * as moment from 'moment';

import { Order } from '../../interfaces';
import { OrderResource } from '../../resources/order.resource';


@Component({
  selector: 'app-order-item',
  templateUrl: './app-order-item.component.html',
  styleUrls: ['./app-order-item.component.scss']
})
export class AppOrderItemComponent implements OnInit, OnDestroy {

  public order: Order;
  public refreshSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderResource: OrderResource
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.order = data.order;
    });

    const order$ = this.orderResource.getOrder(this.route.snapshot.params['orderId']).pipe(
      delay(5000)
    );

    this.refreshSubscription = order$.pipe(
      expand(() => timer(1500).pipe(concatMap(() => order$))),
    ).subscribe((res: Order) => {
      this.order = res;
    });
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }

  public moment(datetime: string): string {
    return moment(datetime).format('DD/MM/YYYY HH:mm:ss');
  }

  public getOrderStateClasses(classes: string[] = []): string {
    const map = {
      created: 'text-warning',
      cancelled: 'text-danger',
      confirmed: 'text-primary',
      delivered: 'text-success',
    };
    return [...classes, map[this.order.state] || 'text-dark'].join(' ');
  }

  public deleteOrder(): void {
    if (confirm('Are you sure want to delete an order?')) {
      this.orderResource.deleteOrder(this.order._id).subscribe(
        (res: any) => {
          this.router.navigateByUrl('/');
        },
        (err: any) => {
          alert('Order deletion failed');
        }
      );
    }
  }

}
