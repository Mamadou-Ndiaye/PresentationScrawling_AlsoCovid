import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocovidBeninComponent } from './infocovid-benin.component';

describe('InfocovidBeninComponent', () => {
  let component: InfocovidBeninComponent;
  let fixture: ComponentFixture<InfocovidBeninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfocovidBeninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocovidBeninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
