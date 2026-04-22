import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CartPage } from './cart-page';

const localStorageMock = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
  clear: () => { },
  key: () => null,
  length: 0,
};

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;

  beforeEach(async () => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: localStorageMock,
      configurable: true,
    });

    await TestBed.configureTestingModule({
      imports: [CartPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
