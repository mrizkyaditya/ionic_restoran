import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DineInPage } from './dine-in.page';

describe('DineInPage', () => {
  let component: DineInPage;
  let fixture: ComponentFixture<DineInPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DineInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
