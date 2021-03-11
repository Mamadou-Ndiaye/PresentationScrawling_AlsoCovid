import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocovidGabonComponent } from './infocovid-gabon.component';

describe('InfocovidGabonComponent', () => {
  let component: InfocovidGabonComponent;
  let fixture: ComponentFixture<InfocovidGabonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfocovidGabonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocovidGabonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
