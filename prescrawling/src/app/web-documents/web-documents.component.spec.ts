import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDocumentsComponent } from './web-documents.component';

describe('WebDocumentsComponent', () => {
  let component: WebDocumentsComponent;
  let fixture: ComponentFixture<WebDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
