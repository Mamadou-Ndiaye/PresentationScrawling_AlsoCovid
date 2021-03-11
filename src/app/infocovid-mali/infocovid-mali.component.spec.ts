import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocovidMaliComponent } from './infocovid-mali.component';

describe('InfocovidMaliComponent', () => {
  let component: InfocovidMaliComponent;
  let fixture: ComponentFixture<InfocovidMaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfocovidMaliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocovidMaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
