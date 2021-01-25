import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlosonesComponent } from './plosones.component';

describe('PlosonesComponent', () => {
  let component: PlosonesComponent;
  let fixture: ComponentFixture<PlosonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlosonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlosonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
