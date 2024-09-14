import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassButtonComponent } from './glass-button.component';

describe('GlassButtonComponent', () => {
  let component: GlassButtonComponent;
  let fixture: ComponentFixture<GlassButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
