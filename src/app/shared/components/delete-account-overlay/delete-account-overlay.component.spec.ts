import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountOverlayComponent } from './delete-account-overlay.component';

describe('DeleteAccountOverlayComponent', () => {
  let component: DeleteAccountOverlayComponent;
  let fixture: ComponentFixture<DeleteAccountOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAccountOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccountOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
