import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSettingsButtonComponent } from './simple-settings-button.component';

describe('SimpleSettingsButtonComponent', () => {
  let component: SimpleSettingsButtonComponent;
  let fixture: ComponentFixture<SimpleSettingsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleSettingsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleSettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
