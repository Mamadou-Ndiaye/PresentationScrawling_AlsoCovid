import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wp2Component } from './wp2.component';

describe('Wp2Component', () => {
  let component: Wp2Component;
  let fixture: ComponentFixture<Wp2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Wp2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Wp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
