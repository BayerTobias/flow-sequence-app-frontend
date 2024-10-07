import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsThemesComponent } from './settings-themes.component';

describe('SettingsThemesComponent', () => {
  let component: SettingsThemesComponent;
  let fixture: ComponentFixture<SettingsThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsThemesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
