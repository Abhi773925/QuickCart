import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Herosection } from './herosection';

describe('Herosection', () => {
  let component: Herosection;
  let fixture: ComponentFixture<Herosection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Herosection],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Herosection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
