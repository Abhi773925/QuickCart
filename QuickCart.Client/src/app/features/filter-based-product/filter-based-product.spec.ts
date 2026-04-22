import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { FilterBasedProduct } from './filter-based-product';

const localStorageMock = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
  clear: () => { },
  key: () => null,
  length: 0,
};

describe('FilterBasedProduct', () => {
  let component: FilterBasedProduct;
  let fixture: ComponentFixture<FilterBasedProduct>;

  beforeEach(async () => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: localStorageMock,
      configurable: true,
    });

    await TestBed.configureTestingModule({
      imports: [FilterBasedProduct],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterBasedProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
