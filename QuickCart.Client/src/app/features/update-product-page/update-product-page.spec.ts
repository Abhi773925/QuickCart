import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UpdateProductPage } from './update-product-page';

const localStorageMock = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
  clear: () => { },
  key: () => null,
  length: 0,
};

describe('UpdateProductPage', () => {
  let component: UpdateProductPage;
  let fixture: ComponentFixture<UpdateProductPage>;

  beforeEach(async () => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: localStorageMock,
      configurable: true,
    });

    await TestBed.configureTestingModule({
      imports: [UpdateProductPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProductPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
