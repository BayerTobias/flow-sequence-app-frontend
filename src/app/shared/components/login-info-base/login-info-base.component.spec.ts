import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInfoBaseComponent } from './login-info-base.component';

describe('LoginInfoBaseComponent', () => {
  let component: LoginInfoBaseComponent;
  let fixture: ComponentFixture<LoginInfoBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginInfoBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginInfoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
