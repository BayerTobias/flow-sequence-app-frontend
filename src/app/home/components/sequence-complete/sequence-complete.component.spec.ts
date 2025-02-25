import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceCompleteComponent } from './sequence-complete.component';

describe('SequenceCompleteComponent', () => {
  let component: SequenceCompleteComponent;
  let fixture: ComponentFixture<SequenceCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SequenceCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SequenceCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
