import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConvertFormComponent } from './currency-convert-form.component';

describe('CurrencyConvertFormComponent', () => {
  let component: CurrencyConvertFormComponent;
  let fixture: ComponentFixture<CurrencyConvertFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyConvertFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConvertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
