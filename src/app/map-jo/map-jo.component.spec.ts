import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapJoComponent } from './map-jo.component';

describe('MapJoComponent', () => {
  let component: MapJoComponent;
  let fixture: ComponentFixture<MapJoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapJoComponent]
    });
    fixture = TestBed.createComponent(MapJoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
