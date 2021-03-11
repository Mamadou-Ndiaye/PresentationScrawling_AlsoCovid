import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocovidSenegalComponent } from './infocovid-senegal.component';

describe('InfocovidSenegalComponent', () => {
  let component: InfocovidSenegalComponent;
  let fixture: ComponentFixture<InfocovidSenegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfocovidSenegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocovidSenegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
