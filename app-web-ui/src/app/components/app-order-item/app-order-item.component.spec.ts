import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OrderResource } from '../../resources/order.resource';
import { AppOrderItemComponent } from './app-order-item.component';

import { OrderResourceMock } from '../../app.component.spec';


describe('AppOrderItemComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppOrderItemComponent,
      ],
      providers: [
        { provide: OrderResource, useClass: OrderResourceMock },
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppOrderItemComponent);
    const com = fixture.debugElement.componentInstance;
    expect(com).toBeTruthy();
  });

});
