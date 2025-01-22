import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCompletedSequencesComponent } from './settings-completed-sequences.component';

describe('SettingsCompletedSequencesComponent', () => {
  let component: SettingsCompletedSequencesComponent;
  let fixture: ComponentFixture<SettingsCompletedSequencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsCompletedSequencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsCompletedSequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
