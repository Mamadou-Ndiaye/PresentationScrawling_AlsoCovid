import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocovidsenegalComponent } from './infocovidsenegal.component';

describe('InfocovidsenegalComponent', () => {
  let component: InfocovidsenegalComponent;
  let fixture: ComponentFixture<InfocovidsenegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfocovidsenegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocovidsenegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
