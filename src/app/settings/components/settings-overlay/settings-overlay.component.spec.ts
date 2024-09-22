import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOverlayComponent } from './settings-overlay.component';

describe('SettingsOverlayComponent', () => {
  let component: SettingsOverlayComponent;
  let fixture: ComponentFixture<SettingsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
