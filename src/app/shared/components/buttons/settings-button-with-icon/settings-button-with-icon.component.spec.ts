import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsButtonWithIconComponent } from './settings-button-with-icon.component';

describe('SettingsButtonWithIconComponent', () => {
  let component: SettingsButtonWithIconComponent;
  let fixture: ComponentFixture<SettingsButtonWithIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsButtonWithIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsButtonWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
