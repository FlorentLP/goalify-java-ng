import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitFormModalComponent } from './habit-form-modal.component';

describe('HabitFormModalComponent', () => {
  let component: HabitFormModalComponent;
  let fixture: ComponentFixture<HabitFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitFormModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
