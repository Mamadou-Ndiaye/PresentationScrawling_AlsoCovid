import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocovidBurkinaComponent } from './infocovid-burkina.component';

describe('InfocovidBurkinaComponent', () => {
  let component: InfocovidBurkinaComponent;
  let fixture: ComponentFixture<InfocovidBurkinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfocovidBurkinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocovidBurkinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
