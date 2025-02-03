import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewOverlayComponent } from './preview-overlay.component';

describe('PreviewOverlayComponent', () => {
  let component: PreviewOverlayComponent;
  let fixture: ComponentFixture<PreviewOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
