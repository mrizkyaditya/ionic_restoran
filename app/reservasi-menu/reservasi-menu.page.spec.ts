import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservasiMenuPage } from './reservasi-menu.page';

describe('ReservasiMenuPage', () => {
  let component: ReservasiMenuPage;
  let fixture: ComponentFixture<ReservasiMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasiMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
