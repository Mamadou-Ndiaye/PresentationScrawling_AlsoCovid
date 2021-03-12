import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElsevierComponent } from './elsevier.component';

describe('ElsevierComponent', () => {
  let component: ElsevierComponent;
  let fixture: ComponentFixture<ElsevierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElsevierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElsevierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
