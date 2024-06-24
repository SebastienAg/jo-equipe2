import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancesTableComponent } from './performances-table.component';

describe('PerformancesTableComponent', () => {
  let component: PerformancesTableComponent;
  let fixture: ComponentFixture<PerformancesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformancesTableComponent]
    });
    fixture = TestBed.createComponent(PerformancesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
