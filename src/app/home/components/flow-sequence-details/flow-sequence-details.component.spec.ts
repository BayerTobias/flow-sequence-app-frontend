import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowSequenceDetailsComponent } from './flow-sequence-details.component';

describe('FlowSequenceDetailsComponent', () => {
  let component: FlowSequenceDetailsComponent;
  let fixture: ComponentFixture<FlowSequenceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowSequenceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowSequenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
