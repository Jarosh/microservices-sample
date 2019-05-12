import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { IncOrderFormComponent } from './inc-order-form.component';


describe('IncOrderFormComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        TagInputModule,
      ],
      declarations: [
        IncOrderFormComponent,
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(IncOrderFormComponent);
    const com = fixture.debugElement.componentInstance;
    expect(com).toBeTruthy();
  });

});
