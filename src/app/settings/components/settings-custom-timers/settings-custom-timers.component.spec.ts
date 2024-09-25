import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCustomTimersComponent } from './settings-custom-timers.component';

describe('SettingsCustomTimersComponent', () => {
  let component: SettingsCustomTimersComponent;
  let fixture: ComponentFixture<SettingsCustomTimersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsCustomTimersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsCustomTimersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
