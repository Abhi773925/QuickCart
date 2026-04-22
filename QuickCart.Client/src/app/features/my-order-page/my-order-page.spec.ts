import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MyOrderPage } from './my-order-page';

const localStorageMock = {
  getItem: () => 'mock-token',
  setItem: () => { },
  removeItem: () => { },
  clear: () => { },
  key: () => null,
  length: 0,
};

describe('MyOrderPage', () => {
  let component: MyOrderPage;
  let fixture: ComponentFixture<MyOrderPage>;

  beforeEach(async () => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: localStorageMock,
      configurable: true,
    });

    await TestBed.configureTestingModule({
      imports: [MyOrderPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MyOrderPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
