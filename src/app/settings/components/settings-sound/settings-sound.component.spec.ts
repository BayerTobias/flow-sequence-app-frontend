import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSoundComponent } from './settings-sound.component';

describe('SettingsSoundComponent', () => {
  let component: SettingsSoundComponent;
  let fixture: ComponentFixture<SettingsSoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsSoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
