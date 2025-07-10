import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PilihMejaPage } from './pilih-meja.page';

describe('PilihMejaPage', () => {
  let component: PilihMejaPage;
  let fixture: ComponentFixture<PilihMejaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PilihMejaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
