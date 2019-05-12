import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { Observable, of } from 'rxjs';

import { Order } from './interfaces';
import { OrderResource } from './resources/order.resource';
import { AppComponent } from './app.component';
import { AppOrderListComponent } from './components/app-order-list/app-order-list.component';
import { IncOrderItemComponent } from './components/inc-order-item/inc-order-item.component';
import { IncOrderFormComponent } from './components/inc-order-form/inc-order-form.component';


export class OrderResourceMock {

  public getAllOrders(): Observable<Order[]> {
    return of([
        {
            _id: '1234567890',
            id_user: '123',
            state: 'created',
            items: [ 'lorem', 'ipsum', 'dolor', 'sit', 'amet' ],
            summary: 'qwerty',
            created_at: '2019-05-12T16:45:49.000Z',
            updated_at: '2019-05-12T16:45:49.000Z',
        }
    ]);
  }
}


describe('AppComponent', () => {

  let orderResource: OrderResource;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        TagInputModule,
      ],
      declarations: [
        AppComponent,
        AppOrderListComponent,
        IncOrderItemComponent,
        IncOrderFormComponent,
      ],
      providers: [
        { provide: OrderResource, useClass: OrderResourceMock },
      ],
    }).compileComponents();
    orderResource = TestBed.get(OrderResource);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'microservices-sample-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('microservices-sample-ui');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to microservices-sample-ui!');
  });

});
