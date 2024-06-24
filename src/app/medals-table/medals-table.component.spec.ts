import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalsTableComponent } from './medals-table.component';

describe('MedalsTableComponent', () => {
  let component: MedalsTableComponent;
  let fixture: ComponentFixture<MedalsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedalsTableComponent]
    });
    fixture = TestBed.createComponent(MedalsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
