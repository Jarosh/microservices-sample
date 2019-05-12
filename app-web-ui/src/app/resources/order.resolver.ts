import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Order } from '../interfaces';
import { OrderResource } from './order.resource';


@Injectable()
export class OrderResolver implements Resolve<Observable<Order>> {

  constructor(
    private router: Router,
    private orderResource: OrderResource
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.orderResource.getOrder(route.paramMap.get('orderId')).pipe(
        catchError(() => {
            alert('404 / Not Found');
            this.router.navigateByUrl('/');
            return of(null);
        })
    );
  }

}
