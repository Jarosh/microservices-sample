import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { OrderResource } from '../../resources/order.resource';
import { AppOrderListComponent } from './app-order-list.component';
import { IncOrderItemComponent } from '../inc-order-item/inc-order-item.component';
import { IncOrderFormComponent } from '../inc-order-form/inc-order-form.component';

import { OrderResourceMock } from '../../app.component.spec';


describe('AppOrderListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        TagInputModule,
      ],
      declarations: [
        AppOrderListComponent,
        IncOrderItemComponent,
        IncOrderFormComponent,
      ],
      providers: [
        { provide: OrderResource, useClass: OrderResourceMock },
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppOrderListComponent);
    const com = fixture.debugElement.componentInstance;
    expect(com).toBeTruthy();
  });

});
