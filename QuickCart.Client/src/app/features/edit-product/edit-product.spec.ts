import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { EditProduct } from './edit-product';

describe('EditProduct', () => {
  let component: EditProduct;
  let fixture: ComponentFixture<EditProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProduct],
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

    fixture = TestBed.createComponent(EditProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
