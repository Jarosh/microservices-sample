import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderResolver } from './resources/order.resolver';
import { AppOrderListComponent } from './components/app-order-list/app-order-list.component';
import { AppOrderItemComponent } from './components/app-order-item/app-order-item.component';


const routes: Routes = [
    {
        path: '',
        component: AppOrderListComponent,
    },
    {
        path: 'order/:orderId',
        component: AppOrderItemComponent,
        resolve: { order: OrderResolver }
    },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
