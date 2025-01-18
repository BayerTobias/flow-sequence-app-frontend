import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowSequenceTimerComponent } from './flow-sequence-timer.component';

describe('HomeComponent', () => {
  let component: FlowSequenceTimerComponent;
  let fixture: ComponentFixture<FlowSequenceTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowSequenceTimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowSequenceTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
