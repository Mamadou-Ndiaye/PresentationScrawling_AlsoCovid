import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocovidComponent } from './infocovid.component';

describe('InfocovidComponent', () => {
  let component: InfocovidComponent;
  let fixture: ComponentFixture<InfocovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfocovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
