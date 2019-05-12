import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Order } from '../interfaces';


const BASE_URL = 'http://localhost:8081/v1';


@Injectable()
export class OrderResource {

  constructor(
    private http: HttpClient
  ) {
  }

  public getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${BASE_URL}/order`);
  }

  public getOrder(orderId): Observable<Order> {
    return this.http.get<Order>(`${BASE_URL}/order/${orderId}`);
  }

  public deleteOrder(orderId): Observable<Order> {
    return this.http.delete<Order>(`${BASE_URL}/order/${orderId}`);
  }

  public createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${BASE_URL}/order`, order);
  }

}
