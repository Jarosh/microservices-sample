import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppOrderListComponent } from './components/app-order-list/app-order-list.component';
import { AppOrderItemComponent } from './components/app-order-item/app-order-item.component';
import { IncOrderFormComponent } from './components/inc-order-form/inc-order-form.component';
import { IncOrderItemComponent } from './components/inc-order-item/inc-order-item.component';

import { OrderResource } from './resources/order.resource';
import { OrderResolver } from './resources/order.resolver';

@NgModule({
  declarations: [
    AppComponent,
    AppOrderListComponent,
    AppOrderItemComponent,
    IncOrderFormComponent,
    IncOrderItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    AppRoutingModule,
  ],
  providers: [
      OrderResource,
      OrderResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
