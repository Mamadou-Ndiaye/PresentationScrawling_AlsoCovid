import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wp1Component } from './wp1.component';

describe('Wp1Component', () => {
  let component: Wp1Component;
  let fixture: ComponentFixture<Wp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Wp1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Wp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
